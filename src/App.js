import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Calculator from "./Components/Calculator/Calculator";
import Map from "./Components/Map/Map";
import LandingPage from "./Components/LandingPage/LandingPage";
import Registeration from "./Components/Registeration/Registeration";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/calculator" component={Calculator} />
          <Route path="/map" component={Map} />
          <Route path="/register" component={Registeration} />
          <Route path="/login" component={Login} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
