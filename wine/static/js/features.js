console.log("here now");

var winePrediction = d3.select("#wine-preference");
// clear existing data
winePrediction.html("");
// write prediction
winePrediction = winePrediction.append("h3").text("Predicted Preference");

d3.select("#predictwine").on("click", mapPreferences);

function mapPreferences() {
    d3.event.preventDefault();

    // wine style
    var styles = document.getElementsByName('wine-style');

    for (var i=0, length = styles.length; i < length; i++) {
        if (styles[i].checked) {
            var wineStyle = styles[i].value;
            // console.log(styles[i].value);
        }
    }

    // sweetness descriptor
    var sweetness = document.getElementsByName('wine-sweetness');

    for (var i=0, length = sweetness.length; i < length; i++) {
        if (sweetness[i].checked) {
            var wineSweetness = sweetness[i].value;
            // console.log(sweetness[i].value);
        }
    }

    // aromatic
    var aromatic = document.getElementsByName('wine-aroma');

    for (var i=0, length = aromatic.length; i < length; i++) {
        if (aromatic[i].checked) {
            var wineAroma = aromatic[i].value;
            // console.log(aromatic[i].value);
        }
    }

    // tartness or tanginess
    var tartness = document.getElementsByName('wine-tartness');

    for (var i=0, length = tartness.length; i < length; i++) {
        if (tartness[i].checked) {
            var wineTartness = tartness[i].value;
            // console.log(tartness[i].value);
        }
    }

    // fruitiness
    var fruityYN = document.getElementsByName('wine-fruity');

    for (var i=0, length = fruityYN.length; i < length; i++) {
        if (fruityYN[i].checked) {
            var wineFruity = fruityYN[i].value;
            // console.log(fruityYN[i].value);
        }
    }

    console.log("wine-style: " + wineStyle); // style-light, style-medium, style-full
    console.log("wine-sweet: " + wineSweetness);
    console.log("wine-aroma: " + wineAroma);
    console.log("wine-tart: " + wineTartness);
    console.log("wine-fruity: " + wineFruity);

    // get feature values
    // wine-style
    // style-light: alcohol > 8 and alcohol < 12.5 ;       density > 0.987 and density < 0.992
    // style-medium: alcohol >= 12.5 and alcohol <= 13.5 ; density >= 0.992 and density <= 0.997
    // style-full: alcohol > 13.5 and alcohol < 14.9 ;       density > 0.997 and density < 1.038
    if (wineStyle == 'style-light') {
        var alcohol = randomize(8.0, 12.5)
        var density = randomize(0.987, 0.992)
    } else if (wineStyle == 'style-medium') {
        var alcohol = randomize(12.5, 13.5);
        var density = randomize(0.992, 0.997);
    } else if (wineStyle == 'style-full') {
        var alcohol = randomize(13.5, 14.9);
        var density = randomize(0.997, 1.038);
    }

    // wine-sweetness
    // swExtraDry: residual_sugar > 0.6 and residual_sugar < 3
    // swDry: residual_sugar >= 3 and residual_sugar < 18
    // swMedium: residual_sugar >= 18 and residual_sugar < 42
    // swMedSweet: residual_sugar >= 42 and residual_sugar < 45
    // swSweet: residual_sugar >= 45 and residual_sugar <= 65
    if (wineSweetness = 'swExtraDry') {
        var residual_sugar = randomize(0.6, 3.0);
    } else if (wineSweetness == 'swDry') {
        var residual_sugar = randomize(3.0, 18.0);
    } else if (wineSweetness == 'swMedium') {
        var residual_sugar = randomize(18.0, 42.0);
    } else if (wineSweetness == 'swMedSweet') {
        var residual_sugar = randomize(42.0, 45.0);
    } else if (wineSweetness == 'swSweet') {
        var residual_sugar = randomize(45.0, 65.0);
    }

    // wine-aroma volatile acidity
    // aromaticNo 0.08 and 0.29
    // aromaticYes 0.29 and 1.58 
    if (wineAroma == 'aromaticYes') {
        var volatile_acidity = randomize(0.29, 1.58);
    } else if (wineAroma == 'aromaticNo') {
        var volatile_acidity = randomize(0.08, 0.29);
    }

    // wine-tartness fixed_acidity | pH
    // tartnessLow: fixed_acidity >= 3.8 and  <=6.4     | pH > 3.32 and <= 4.01 
    // tartnessMedium: fixed_acidity > 6.4 and <= 7.7   | pH > 3.11 and <= 3.32
    // tartnessHigh: fixed_acidity > 7.7 and <= 15.9    | pH >= 2.72 and <= 3.11
    if (wineTartness == 'tartnessLow') {
        var fixed_acidity = randomize(3.8, 6.4);
        var phLevel = randomize(3.32, 4.01);
    } else if (wineTartness == 'tartnessMedium') {
        var fixed_acidity = randomize(6.4, 7.7);
        var phLevel = randomize(3.11, 3.32);
    } else if (wineTartness == 'tartnessHigh') {
        var fixed_acidity = randomize(7.7, 15.9);
        var phLevel = randomize(2.72, 3.11);
    }

    // wine-fruity citric acid
    // isFruity - citric acid between 0.31 and 1.66
    // isNotFruity - citric acid 0.0 and 0.31
    if (wineFruity == 'isFruity') {
        var citric_acid = randomize(0.31, 1.66);
    } else if (wineFruity == 'isNotFruity') {
        var citric_acid = randomize(0.0, 0.31);
    }

    // data to feed to machine learning (randomforest) model
    // fixed acidity	volatile acidity	citric acid	residual sugar	density	pH	alcohol
    console.log(fixed_acidity);
    console.log(volatile_acidity);
    console.log(citric_acid);
    console.log(residual_sugar);
    console.log(density);
    console.log(phLevel);
    console.log(alcohol.toString());



    winePrefArray = fixed_acidity.toString() + ',' + 
                    volatile_acidity.toString() + ',' + 
                    citric_acid.toString() + ',' + 
                    residual_sugar.toString() + ',' + 
                    density.toString() + ',' + 
                    phLevel.toString() + ',' + alcohol.toString();
    console.log(winePrefArray);

    // get prediction
    getPrediction(winePrefArray);

}; // end getPrediction

function randomize(min, max) {
    var randomNumber = min + Math.random() * (max - min);
    return randomNumber;
}

function getPrediction(winePrefs) {
    var predict_url = '/predict/' + winePrefs;
    console.log(predict_url);
    var redorwhite;

    d3.json(predict_url).then(function (data) {
        console.log(data.wine_pref);

        redorwhite = data.wine_pref;

        var mywine = d3.select("#wine-preference");
        mywine.html("");

        var myh3 = mywine.append("h3").attr("id","wine-type");
        var h3 = document.querySelector("h3");
        h3.innerText=data.wine_pref;


        // get wine recommendations



    });

}

function recommendWines(alcohol, sweetness) {

    var redwhite = d3.select("#wine-type").text();
    console.log(redwhite);

    var wine_url = '/recommendwines/' + wineType + '/' + alcohol + '/' + sweetness;
    console.log(wine_url);

    // get table body
    var tbody = d3.select("tbody");
    tbody.html("");


    d3.json(wine_url).then(function (data) {
        console.log(data);

        data.forEach(function(wine) {
            var row = tbody.append("tr");
            Object.entries(wine).forEach(function([key, value]) {
                var cell = row.append("td");
                cell.text(value);
            })  // object.entries
        })
    })

    var tbody = d3.select("tbody");

}


// app.py
// load model
// model = pickle.load(open('randomforest.sav', 'rb'))

// service route "/predict/<dataArray>"
// @app.route("/predict/<dataArray>")
// def predict_preference(dataArray):
//     data = [[dataArray]]
//     wine_pref = model.predict(data)
//     return wine_pref
