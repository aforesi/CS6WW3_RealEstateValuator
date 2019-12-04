/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import axios from "axios";
import Styles from "../../Styles";
import "./Calculator.css";
import Map from "../Map/Map";


const Calculator = props => {
  const required = value => (value ? undefined : 'Required')
  // const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  // const minValue = min => value =>
  //   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
  // const composeValidators = (...validators) => value =>
  //   validators.reduce((error, validator) => error || validator(value), undefined)

  const [value, setValue] = useState(0);
  const [houseInfo, setHouseInfo] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({lat: null, lng: null});
  const ResultContainer = () => (
    <div className="ResultContainer">Estimated Value: {value}</div>
  );

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div className="Calculator">
      <h1>Calculator</h1>
      <Styles>
        <Form
          initialValues={{
            fireplace: false,
            pool: false,
            centralHeating: false,
            centralCooling: false,
            lat: coordinates.lat,
            lng: coordinates.lng
          }}
          onSubmit={async values => {
            setHouseInfo(values);
            axios
              .post("http://localhost:5000/calculator/", { ...values })
              .then(response => {
                setValue(response.data);
                setSubmitted(true);
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              });
          }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (

                    <div>
                      <label>Address</label>
                      <input {...getInputProps({ placeholder: "Address"})} type="text" />
                      <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                          }
                          return (
                            <div {...getSuggestionItemProps(suggestion, {style})}>
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                )}
              </PlacesAutocomplete>
              <Field name="yearBuilt" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Year Built</label>
                    <input {...input} type="text" placeholder="Year Built" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="stories" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Stories</label>
                    <input {...input} type="text" placeholder="Stories" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="bedrooms" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Bedrooms</label>
                    <input {...input} type="text" placeholder="Bedrooms" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="fullBathrooms" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Full Bathrooms</label>
                    <input {...input} type="text" placeholder="Full Bathrooms" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="halfBathrooms" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Half Bathrooms</label>
                    <input {...input} type="text" placeholder="Half Bathrooms" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="livableSquareFeet" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Livable Square Feet</label>
                    <input {...input} type="text" placeholder="Livable Square Feet" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="totalSquareFeet" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Total Square Feet</label>
                    <input {...input} type="text" placeholder="Total Square Feet" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="garageSquareFeet" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Garage Square Feet</label>
                    <input {...input} type="text" placeholder="Garage Square Feet" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className="formField">
                <label>Garage Type</label>
                <Field name="garageType" component="select" placeholder="" defaultValue={"none"}>
                  <option value="attached">Attached</option>
                  <option value="detached">Detatched</option>
                  <option value="none">None</option>
                </Field>
              </div>
              <div>
                <label>Fireplace</label>
                <Field
                  name="fireplace"
                  component="input"
                  type="checkbox"
                  placeholder=""
                />
              </div>
              <div>
                <label>Pool</label>
                <Field
                  name="pool"
                  component="input"
                  type="checkbox"
                  placeholder=""
                />
              </div>
              <div>
                <label>Central Heating</label>
                <Field
                  name="centralHeating"
                  component="input"
                  type="checkbox"
                  placeholder=""
                />
              </div>
              <div>
                <label>Central Cooling</label>
                <Field
                  name="centralCooling"
                  component="input"
                  type="checkbox"
                  placeholder=""
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
        {submitted ? <ResultContainer /> : undefined}
        {submitted ? <Map predictedHomeInfo={houseInfo} /> : undefined}
      </Styles>
    </div>
  );
};

export default Calculator;
