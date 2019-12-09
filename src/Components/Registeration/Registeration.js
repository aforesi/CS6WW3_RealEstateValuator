/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Styles from "../../Styles";
import "./Registeration.css";

const Registeration = props => {
  const [value, setValue] = useState(0);
  const [className, setClassName] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const ResultContainer = () => <div className={className}>{value}</div>;

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
                if (response.data.error) {
                  setClassName("errorContainer resultContainer");
                  console.log("Error!");
                } else {
                  setClassName("successContainer resultContainer");
                  console.log("Success!");
                }
                setValue(response.data.message);
                setSubmitted(true);
                console.log(response);
                // Redirect to login page in 2 sec
                setTimeout(() => {
                  props.history.push("/login");
                }, 2000);
              })
              .catch(error => {
                setValue(error.data);
                setSubmitted(true);
                console.log(error);
              });
          }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div className="formField">
                <label>Email</label>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="formField">
                <label>Password</label>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="formField">
                <label>Confirm Password</label>
                <Field
                  name="password2"
                  component="input"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="formField">
                <label>First Name</label>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="formField">
                <label>Last name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="formField">
                <label>City</label>
                <Field
                  name="city"
                  component="input"
                  type="text"
                  placeholder="City"
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
              {submitted ? <ResultContainer /> : undefined}

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
