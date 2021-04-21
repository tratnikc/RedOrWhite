## import dependencies
from flask import Flask, jsonify, render_template, redirect, url_for, request
import pickle
from google.oauth2 import service_account
import pandas as pd
import pandas_gbq
from datetime import datetime
import os
import json

## credentials
projectID = 'project-wine-308217'
datasetID = 'wine_dataset'
bigquery_uri = f'bigquery://{projectID}/{datasetID}'



app=Flask(__name__)

# the json credentials stored as env variable
#json_str = os.environ.get('GOOGLE_CREDENTIALS')
# comment out from here

# json_data = {
#   "type": "service_account",
#   "project_id": os.environ.get("PROJECT_ID"),
#   "private_key_id": os.environ.get("PRIVATE_KEY_ID"),
#   "private_key": os.environ.get("PRIVATE_KEY").replace('\\n', '\n'),
#   "client_email": os.environ.get("CLIENT_EMAIL"),
#   "client_id": os.environ.get("CLIENT_ID"),
#   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
#   "token_uri": "https://oauth2.googleapis.com/token",
#   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
#   "client_x509_cert_url": os.environ.get("CLIENT_CERT")
# }
# #  end comment part
# print(json_data)
# # generate json - if there are errors here remove newlines in .env
# #json_data = json.loads(json_str)
# # the private_key needs to replace \n parsed as string literal with escaped newlines
# #json_data['private_key'] = json_data['private_key'].replace('\\n', '\n')
# with open('project-wine.json', 'w')  as f: 
#     json.dump(json_data, f)

# use service_account to generate credentials object
credentials = service_account.Credentials.from_service_account_file('project-wine.json')
# credentials = service_account.Credentials.from_service_account_info(json_data)

## load model
filepath = os.path.join('ML', 'randomforest.sav')
rfmodel = pickle.load(open(filepath, 'rb'))

## front-end routes
@app.route("/")
def main():
    return render_template("index.html")

@app.route("/wine")
def wines():
    return render_template("wine.html")

## service routes
## wine-preference based on machine learning model
@app.route("/predict/<modelparams>")
def predict_preference(modelparams):
    fixed_acidity = modelparams.split(",")[0]
    volatile_acidity = modelparams.split(",")[1]
    citric_acid = modelparams.split(",")[2]
    residual_sugar = modelparams.split(",")[3]
    density = modelparams.split(",")[4]
    phLevel = modelparams.split(",")[5]
    alcohol = modelparams.split(",")[6]

    dataArray = [[fixed_acidity, volatile_acidity, citric_acid, residual_sugar, density, phLevel, alcohol]]
    print(dataArray)

    wine_pref = rfmodel.predict(dataArray)

    user_pref = {"wine_pref" : wine_pref[0]}
    print(user_pref)
    
    return jsonify(user_pref)

@app.route("/recommendwines/<wineType>/<alcohol>/<sweetness>")
def recommendedwines(wineType, alcohol, sweetness):

    sql_wine = f'select * from `{projectID}.{datasetID}.LCBOWines` where category = "{wineType}" ' \
               f'and alcohol_content = {alcohol} and sugar_content_gL = {sweetness} '
    wine_df = pd.read_gbq(sql_wine, project_id = projectID, credentials=credentials, dialect='standard')
    json_obj = wine_df.to_json(orient='records')
    json_loads = json.loads(json_obj)
    json_formatted_string = json.dumps(json_loads, indent=2)
    return json_formatted_string

## run app
if __name__=="__main__":
    app.run(debug=True)