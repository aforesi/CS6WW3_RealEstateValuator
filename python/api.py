import sys
import numpy as np
import pickle as p


def calculatePrice(yearBuilt, stories, bedrooms, fullBathrooms, halfBathrooms, livableSqft, garageSqft, garageType, fireplace, pool, centralHeating, centralCooling):
    model = p.load(open(model_file, 'rb'))

    attached = 0
    detached = 0
    none = 0

    if garageType == 'attached':
        attached = 1
    elif garageType == 'detached':
        detached = 1
    else:
        none = 1


    house_to_value = [
        # House features
        int(yearBuilt),   # year_built
        int(stories),      # stories
        int(bedrooms),      # num_bedrooms
        int(fullBathrooms),      # full_bathrooms
        int(halfBathrooms),      # half_bathrooms
        int(livableSqft),   # livable_sqft
        livableSqft + garageSqft,   # total_sqft
        int(garageSqft),    # garage_sqft
        0,      # carport_sqft
        booleanStringToInt(fireplace),   # has_fireplace
        booleanStringToInt(pool),   # has_pool
        booleanStringToInt(centralHeating),   # has_central_heating
        booleanStringToInt(centralCooling),   # has_central_cooling
        # Garage type: Choose only one
        attached,      # attached
        detached,      # detached
        none,      # none
        # City: Choose only one
        1,      # Amystad
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
        0,      # Lake Carolyn
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
    return prediction.replace("[", "").replace("]", "")

def booleanStringToInt(strBool):
    if(strBool == 'false'):
        return 0
    else:
        return 1

if __name__ == '__main__':
    try:
        model_file = 'model.pickle'
    except FileReadException:
        print ("Couldn't find or read the file")
   
    predictedValue = calculatePrice(
        sys.argv[1],
        sys.argv[2],
        sys.argv[3],
        sys.argv[4],
        sys.argv[5],
        sys.argv[6],
        sys.argv[7],
        sys.argv[8],
        sys.argv[9],
        sys.argv[10],
        sys.argv[11],
        sys.argv[12]
    )
    # Send results to node
    print(str(predictedValue))
    sys.stdout.flush()
