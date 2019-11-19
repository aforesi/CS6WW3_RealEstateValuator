/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";
//import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
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
              <div className="formField">
                <label>Email</label>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="formField">
                <label>Password</label>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
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
        {/* <Form
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
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}
      </Styles>
    </div>
  );
};

export default Login;
