import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import Styles from "../../Styles";
import "./Login.css";

const Login = props => {
  const contextType = AuthContext;

  const [value, setValue] = useState(0);
  const [className, setClassName] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const ResultContainer = () => <div className={className}>{value}</div>;

  return (
    <div className="Login">
      <h1>Sign In</h1>
      <Styles>
        <Form
          onSubmit={async values => {
            axios
              .post("http://localhost:5000/users/login/", { ...values })
              .then(response => {
                if (response.data.error) {
                  setClassName("errorContainer resultContainer");
                  console.log("Error!");
                } else {
                  setClassName("successContainer resultContainer");
                  console.log("Success!");
                  if (response.data.authToken) {
                    this.contextType.login(
                      response.data.authToken,
                      response.data.userId,
                      response.data.tokenExpiration
                    );
                  }
                }
                setValue(response.data.message);
                setSubmitted(true);
                console.log(response);
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
              {submitted ? <ResultContainer /> : undefined}

              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
              </div>

              <div className="buttons">
                <a href="../register">Don't have an account? Sign up here.</a>
              </div>
            </form>
          )}
        />
      </Styles>
    </div>
  );
};

export default Login;
