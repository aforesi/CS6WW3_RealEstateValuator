/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Styles from "../../Styles";
import "./Registeration.css";

const Registeration = props => {
  return (
    <div className="Register">
      <h1>Sign Up</h1>
      <Styles>
        <Form
          initialValues={{
            isRealEstateAgent: false
          }}
          onSubmit={async values => {
            axios
              .post("http://localhost:5000/users/register/", { ...values })
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              });
          }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email</label>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder=""
                />
              </div>
              <div>
                <label>Password</label>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder=""
                />
              </div>
              <div>
                <label>Name</label>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <label>Last name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <label>City</label>
                <Field
                  name="city"
                  component="input"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <label>Real Estate Agent</label>
                <Field
                  name="isRealEstateAgent"
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
      </Styles>
    </div>
  );
};

export default Registeration;
