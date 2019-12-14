/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import axios from "axios";
import Styles from "../../Styles";
import "./Calculator.css";
import Map from "../Map/Map";
import Loading from "../Loading/Loading";
import CurrencyFormat from 'react-currency-format';


const Calculator = props => {

  const required = value => (value ? undefined : 'Required')
  // const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
  // const minValue = min => value =>
  //   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
  // const composeValidators = (...validators) => value =>
  //   validators.reduce((error, validator) => error || validator(value), undefined)
  const userId = props.userId;
  const [value, setValue] = useState(0);
  const [houseInfo, setHouseInfo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({lat: null, lng: null});
  const [proximalHouses, setProximalHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState(null);
  const ResultContainer = () => (
    <div className="ResultContainer">Estimated Value: <CurrencyFormat value={value} displayType={'text'} thousandSeparator={true} prefix={' $'} /></div>
  );
  const LegendContainer = () => (
    <div className="ResultContainer">
      <p>Amenity: </p><div className="amenityMarker"></div>
      <p>Calculated House: </p><div className="predictedMarker"></div>
      <p>Comparable House: </p><div className="comparableMarker"></div>
    </div>
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
            lng: coordinates.lng,
            address: address,
          }}
          onSubmit={
            
            async values => {
            setHouseInfo(values);
            setLoading(true);
            axios
              .post("http://localhost:5000/calculator/", { ...values })
              .then(response => {
                const newHouseInfo = {
                  ...values,
                  calculatedValue: Math.round(parseFloat(response.data))
                }
                setHouseInfo(newHouseInfo);
                setSubmitted(true);
                setValue(Math.round(parseFloat(response.data)));

                const calculatedValue = Math.round(parseFloat(response.data));

                // ...values, calculatedValue

                axios
                .post("http://localhost:5000/properties/addCalculatedProperty",  {
                  ...values,
                  calculatedValue,
                  userId
                } )
                .then(response => {
                  
                }).catch(error => {
                  console.log(error);
                });

              }).catch(error => {
                console.log(error);
              });
            axios
              .get("http://localhost:5000/properties/proximity", {
                params: {
                  lat: coordinates.lat,
                  lng: coordinates.lng
                }})
              .then(response => {
                setProximalHouses(response.data);
              })
              .catch(error => {
                console.log(error);
              });
            axios
              .get("http://localhost:5000/amenities/proximity", {
                params: {
                  lat: coordinates.lat,
                  lng: coordinates.lng
                }})
              .then(response => {
                setAmenities(response.data);
                setTimeout(() => {
                  setLoading(false);
                }, 1500)
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
                { loading && <i className="fa fa-refresh fa-spin"></i> }
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
        { loading && <Loading /> }
        {submitted ? <ResultContainer /> : undefined}
        {submitted ? <Map predictedHomeInfo={houseInfo} proximalHouses={proximalHouses} amenities={amenities} /> : undefined}
        {submitted ? <LegendContainer /> : undefined}
      </Styles>
    </div>
  );
};

export default Calculator;
