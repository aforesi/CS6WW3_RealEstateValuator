import requests
import json

url = 'http://localhost:5000/api/'


house_to_value = [
    # House features
    1978,   # year_built
    2,      # stories
    4,      # num_bedrooms
    4,      # full_bathrooms
    1,      # half_bathrooms 
    4400,   # livable_sqft
    5500,   # total_sqft
    2000,    # garage_sqft
    0,      # carport_sqft
    True,   # has_fireplace
    True,   # has_pool
    True,   # has_central_heating
    True,   # has_central_cooling
    
    # Garage type: Choose only one
    0,      # attached
    1,      # detached
    0,      # none
    
    # City: Choose only one
    0,      # Amystad
    0,      # Brownport
    0,      # Chadstad
    0,      # Clarkberg
    0,      # Coletown
    0,      # Davidfort
    0,      # Davidtown
    0,      # East Amychester
    0,      # East Janiceville
    0,      # East Justin
    0,      # East Lucas
    0,      # Fosterberg
    0,      # Hallfort
    0,      # Jeffreyhaven
    0,      # Jenniferberg
    0,      # Joshuafurt
    0,      # Julieberg
    0,      # Justinport
    1,      # Lake Carolyn
    0,      # Lake Christinaport
    0,      # Lake Dariusborough
    0,      # Lake Jack
    0,      # Lake Jennifer
    0,      # Leahview
    0,      # Lewishaven
    0,      # Martinezfort
    0,      # Morrisport
    0,      # New Michele
    0,      # New Robinton
    0,      # North Erinville
    0,      # Port Adamtown
    0,      # Port Andrealand
    0,      # Port Daniel
    0,      # Port Jonathanborough
    0,      # Richardport
    0,      # Rickytown
    0,      # Scottberg
    0,      # South Anthony
    0,      # South Stevenfurt
    0,      # Toddshire
    0,      # Wendybury
    0,      # West Ann
    0,      # West Brittanyview
    0,      # West Gerald
    0,      # West Gregoryview
    0,      # West Lydia
    0       # West Terrence
]




data = [house_to_value]
j_data = json.dumps(data)
print(j_data)
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
r = requests.post(url, data=j_data, headers=headers)
print(r, r.text)
