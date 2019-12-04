import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Calculator from "./Components/Calculator/Calculator";
import Map from "./Components/Map/Map";
import LandingPage from "./Components/LandingPage/LandingPage";
import Registeration from "./Components/Registeration/Registeration";
import Login from "./Components/Login/Login";
import Properties from "./Components/Properties/ListProperties";
import Users from "./Components/Users/Users";
import AddProperty from "./Components/Properties/AddProperty/AddProperty";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/calculator" component={Calculator} />
          <Route path="/map" component={Map} />
          <Route path="/register" component={Registeration} />
          <Route path="/login" component={Login} />
          <Route path="/properties" component={Properties} />
          <Route path="/add-property" component={AddProperty} />
          <Route path="/users" component={Users} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
