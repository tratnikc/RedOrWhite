#  ETL to google big query

from google.oauth2 import service_account
import pandas_gbq
import json

## credentials
projectID = 'project-wine-308217'
datasetID = 'wine_dataset'
bigquery_uri = f'bigquery://{projectID}/{datasetID}'

credentials = service_account.Credentials.from_service_account_file('project-wine.json')

# step1
# open csv from_service_account_file

# step2
# load csv file to dataframe

# step3
# load dataframe into database
pandas_gbq.to_gbq(wine_df, 'wine_dataset.LCBOWines', if_exists='append', project_id=projectID, credentials=credentials)

