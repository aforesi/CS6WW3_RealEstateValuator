import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

import AuthContext from "./Context/auth-context";

import Layout from "./Components/Layout/Layout";
import Calculator from "./Components/Calculator/Calculator";
// import Map from "./Components/Map/Map";
import LandingPage from "./Components/LandingPage/LandingPage";
import Registeration from "./Components/Registeration/Registeration";
import Login from "./Components/Login/Login";
import Properties from "./Components/Properties/ListProperties";
import Users from "./Components/Users/Users";
import AddProperty from "./Components/Properties/AddProperty/AddProperty";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
    console.log("userid: ", userId);
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  isAdmin = () => {
    if (this.state.userId && this.state.userId === "5de42d840a6a691620da316b")
      return true;
    else return false;
  };

  render() {
    // Render sign up and sign in pages only user doesn't have a token (not logged in)
    // Render properties, add property and users pages only when user has a token
    return (
      <div className="App">
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
            isAdmin: this.isAdmin
          }}
        >
          <Layout>
            <Switch>
              {/* <Route path="/map" component={Map} /> */}
              {!this.state.token && (
                <Route path="/register" component={Registeration} />
              )}
              <Route path="/login" component={Login} />
              {this.state.token && this.isAdmin() && (
                <Route path="/properties" component={Properties} />
              )}
              {this.state.token && (
                <Route path="/add-property" component={AddProperty} />
              )}
              {this.state.token && (
                <Route path="/calculator" component={Calculator} />
              )}
              {this.state.token && this.isAdmin() && (
                <Route path="/users" component={Users} />
              )}
              <Route path="/" component={LandingPage} />
            </Switch>
          </Layout>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
