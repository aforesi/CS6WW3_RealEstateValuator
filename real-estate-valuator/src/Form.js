// /* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Styles from "./Styles";

const onSubmit = async values => {
  axios
    .post("http://localhost:5000/api/", { ...values })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const TestForm = () => (
  <div>
    <Styles>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Year Built</label>
              <Field
                name="yearBuilt"
                component="input"
                type="text"
                placeholder="Year Built"
              />
            </div>
            <div>
              <label>Stories</label>
              <Field
                name="stories"
                component="input"
                type="text"
                placeholder="Stories"
              />
            </div>
            <div>
              <label>Bedrooms</label>
              <Field
                name="bedrooms"
                component="input"
                type="text"
                placeholder="Bedrooms"
              />
            </div>
            <div>
              <label>Full Bathrooms</label>
              <Field
                name="fullBathrooms"
                component="input"
                type="text"
                placeholder="Full Bathrooms"
              />
            </div>
            <div>
              <label>Half Bathrooms</label>
              <Field
                name="halfBathrooms"
                component="input"
                type="text"
                placeholder="Half Bathrooms"
              />
            </div>
            <div>
              <label>Livable Square Feet</label>
              <Field
                name="livableSquareFeet"
                component="input"
                type="text"
                placeholder="Livable Square Feet"
              />
            </div>
            <div>
              <label>Total Square Feet</label>
              <Field
                name="totalSquareFeet"
                component="input"
                type="text"
                placeholder="Total Square Feet"
              />
            </div>
            <div>
              <label>Garage Square Feet</label>
              <Field
                name="garageSquareFeet"
                component="input"
                type="text"
                placeholder="Garage Square Feet"
              />
            </div>
            <div>
              <label>Fireplace</label>
              <Field
                name="fireplace"
                component="input"
                type="checkbox"
                placeholder="Fireplace"
              />
            </div>
            <div>
              <label>Pool</label>
              <Field
                name="pool"
                component="input"
                type="checkbox"
                placeholder="Pool"
              />
            </div>
            <div>
              <label>Central Heating</label>
              <Field
                name="centralHeating"
                component="input"
                type="checkbox"
                placeholder="Central Heating"
              />
            </div>
            <div>
              <label>Central Cooling</label>
              <Field
                name="centralCooling"
                component="input"
                type="checkbox"
                placeholder="Central Cooling"
              />
            </div>
            <div>
              <label>Garage Type</label>
              <Field
                name="garageType"
                component="select"
                placeholder="Central Cooling"
              >
                <option value="default">Select...</option>
                <option value="attached">Attached</option>
                <option value="detached">Detatched</option>
                <option value="none">None</option>
              </Field>
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
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  </div>
);

export default TestForm;
