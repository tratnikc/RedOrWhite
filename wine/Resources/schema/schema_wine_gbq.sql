-- wine scrape

CREATE table `project-wine-308217.wine_dataset.LCBOWines` (
    wine_name STRING not null,
    link STRING not null,
    img STRING,
    bottle_size_ml STRING not null,
    alcohol_content FLOAT64 not null,
    country STRING,
    winery STRING,
    sugar_content_gL FLOAT64,
    sweetness_descr STRING,
    style STRING,
    varietal STRING,
    price FLOAT64,
    category STRING not null,
    wine_desc STRING
);

-- WINE physicochemical
CREATE table `project-wine-308217.wine_dataset.WineQuality` (
    wine_type STRING not null,
    fixed_acidity NUMERIC(3,5),
    volatile_acidity NUMERIC(3,5),
    citric_acid FLOAT64,
    residual_sugar FLOAT64,
    chlorides NUMERIC(3,5),
    free_sulfur_dioxide FLOAT64,
    total_sulfur_dioxide FLOAT64,
    density NUMERIC(3,5),
    pH FLOAT64,
    sulphates FLOAT64,
    alcohol NUMERIC(3,9),
    quality INT64
);

-- wine rating
-- CREATE table WineRatings (

-- );