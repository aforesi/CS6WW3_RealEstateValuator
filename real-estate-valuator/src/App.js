import React from "react";
import Layout from "./Components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Calculator from "./Components/Calculator/Calculator";
import LandingPage from "./Components/LandingPage/LandingPage";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/calculator" component={Calculator} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
