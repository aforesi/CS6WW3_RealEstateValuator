from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import json
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)


@app.route('/api/', methods=['POST'])
def makecalc():
    house_to_value = [
        # House features
        int(request.json['yearBuilt']),   # year_built
        int(request.json['stories']),      # stories
        int(request.json['bedrooms']),      # num_bedrooms
        int(request.json['fullBathrooms']),      # full_bathrooms
        int(request.json['halfBathrooms']),      # half_bathrooms
        int(request.json['livableSquareFeet']),   # livable_sqft
        int(request.json['totalSquareFeet']),   # total_sqft
        int(request.json['garageSquareFeet']),    # garage_sqft
        0,      # carport_sqft
        request.json['fireplace'],   # has_fireplace
        request.json['pool'],   # has_pool
        request.json['centralHeating'],   # has_central_heating
        request.json['centralCooling'],   # has_central_cooling
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
    homes_to_value = [
        house_to_value
    ]
    prediction = np.array2string(model.predict(homes_to_value))
    return jsonify(prediction.replace("[", "").replace("]", ""))


if __name__ == '__main__':
    modelfile = 'model.pickle'
    model = p.load(open(modelfile, 'rb'))
    app.run(debug=True, host='localhost')
