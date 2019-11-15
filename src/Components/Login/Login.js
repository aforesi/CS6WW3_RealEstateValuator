/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Styles from "../../Styles";
import "./Login.css";

const Login = props => {
  return (
    <div className="Login">
      <h1>Sign In</h1>
      <Styles>
        <Form
          initialValues={{
            isRealEstateAgent: false
          }}
          onSubmit={async values => {
            axios
              .post("http://localhost:5000/users/login/", { ...values })
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

              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
              </div>
            </form>
          )}
        />
      </Styles>
    </div>
  );
};

export default Login;
