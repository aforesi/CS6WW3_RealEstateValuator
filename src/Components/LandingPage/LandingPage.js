import React from "react";
import "./LandingPage.css";

const LandingPage = props => (
  <div className="LandingPage">
    <h1>Welcome to the Real Estate Valuator!</h1>
    <h3>You can find your property's value in here.</h3>
    <h3>
      Check out the
      <a href="./calculator"> Calculator </a>
      page for that.
    </h3>
  </div>
);

export default LandingPage;
