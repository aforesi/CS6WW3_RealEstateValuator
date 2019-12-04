import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import AuthContext from "../../Context/auth-context";
import Styles from "../../Styles";
import "./Login.css";

class Login extends Component {
  state = {
    value: 0,
    className: 0,
    submitted: false
  };

  static contextType = AuthContext;

  setValue(newValue) {
    this.setState({
      value: newValue
    });
  }

  setClassName(newClassName) {
    this.setState({
      className: newClassName
    });
  }

  setSubmitted(isSubmitted) {
    this.setState({
      submitted: isSubmitted
    });
  }

  render() {
    const ResultContainer = () => (
      <div className={this.state.className}>{this.state.value}</div>
    );

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
                    this.setClassName("errorContainer resultContainer");
                    console.log("Error!");
                  } else {
                    this.setClassName("successContainer resultContainer");
                    console.log("Success!");
                  }
                  this.setValue(response.data.message);
                  this.setSubmitted(true);
                  console.log(response);
                  return response;
                })
                .then(response => {
                  if (response.data.authToken) {
                    this.context.login(
                      response.data.authToken,
                      response.data.userId,
                      response.data.tokenExpiration
                    );
                    // Redirect to login page in 2 sec
                    setTimeout(() => {
                      this.props.history.push("/");
                    }, 2000);
                  }
                })
                .catch(error => {
                  this.setValue(error.data);
                  this.setSubmitted(true);
                  console.log(error);
                  return;
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
                {this.state.submitted ? <ResultContainer /> : undefined}

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
  }
}

export default Login;
