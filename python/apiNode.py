import sys
import numpy as np
import pickle as p


def makecalc():

    house_to_value = [
        # House features
        int(sys.argv[1]),   # year_built
        int(sys.argv[2]),      # stories
        int(sys.argv[3]),      # num_bedrooms
        int(sys.argv[4]),      # full_bathrooms
        int(sys.argv[5]),      # half_bathrooms
        int(sys.argv[6]),   # livable_sqft
        int(sys.argv[7]),   # total_sqft
        int(sys.argv[8]),    # garage_sqft
        0,      # carport_sqft
        booleanStringToInt(sys.argv[9]),   # has_fireplace
        booleanStringToInt(sys.argv[10]),   # has_pool
        booleanStringToInt(sys.argv[11]),   # has_central_heating
        booleanStringToInt(sys.argv[12]),   # has_central_cooling
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
    model = p.load(open(model_file, 'rb'))
    dataToSendBack = makecalc()
    # Send results to node
    print(str(dataToSendBack))
    sys.stdout.flush()
