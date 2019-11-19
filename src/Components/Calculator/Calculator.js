/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Styles from "../../Styles";
import "./Calculator.css";

const Calculator = props => {
  const [value, setValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const ResultContainer = () => (
    <div className="ResultContainer">Estimated Value: {value}</div>
  );

  return (
    <div className="Calculator">
      <h1>Calculator</h1>
      <Styles>
        <Form
          initialValues={{
            fireplace: false,
            pool: false,
            centralHeating: false,
            centralCooling: false
          }}
          onSubmit={async values => {
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
              <div className="formField">
                <label>Year Built</label>
                <Field
                  name="yearBuilt"
                  component="input"
                  type="text"
                  placeholder="Year Built"
                />
              </div>
              <div className="formField">
                <label>Stories</label>
                <Field
                  name="stories"
                  component="input"
                  type="text"
                  placeholder="Stories"
                />
              </div>
              <div className="formField">
                <label>Bedrooms</label>
                <Field
                  name="bedrooms"
                  component="input"
                  type="text"
                  placeholder="Bedrooms"
                />
              </div>
              <div className="formField">
                <label>Full Bathrooms</label>
                <Field
                  name="fullBathrooms"
                  component="input"
                  type="text"
                  placeholder="Full Bathrooms"
                />
              </div>
              <div className="formField">
                <label>Half Bathrooms</label>
                <Field
                  name="halfBathrooms"
                  component="input"
                  type="text"
                  placeholder="Half Bathrooms"
                />
              </div>
              <div className="formField">
                <label>Livable Square Feet</label>
                <Field
                  name="livableSquareFeet"
                  component="input"
                  type="text"
                  placeholder="Livable Square Feet"
                />
              </div>
              <div className="formField">
                <label>Total Square Feet</label>
                <Field
                  name="totalSquareFeet"
                  component="input"
                  type="text"
                  placeholder="Total Square Feet"
                />
              </div>
              <div className="formField">
                <label>Garage Square Feet</label>
                <Field
                  name="garageSquareFeet"
                  component="input"
                  type="text"
                  placeholder="Garage Square Feet"
                />
              </div>
              <div className="formField">
                <label>Garage Type</label>
                <Field name="garageType" component="select" placeholder="">
                  <option value="default">Garage Type...</option>
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
                <button type="submit" disabled={submitting || pristine}>
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
      </Styles>
    </div>
  );
};

export default Calculator;
