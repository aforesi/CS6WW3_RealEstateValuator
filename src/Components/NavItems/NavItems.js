import React from "react";
import AuthContext from "../../Context/auth-context";
import NavItem from "./NavItem/NavItem";
import "./NavItems.css";

const NavItems = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <ul className="NavItems">
          <NavItem link="/" exact>
            Home
          </NavItem>
          <NavItem link="/calculator" exact>
            Calculator
          </NavItem>
          <NavItem link="/map" exact>
            Map
          </NavItem>
          {!context.token && (
            <React.Fragment>
              <NavItem link="/register" exact>
                Sign Up
              </NavItem>
              <NavItem link="/login" exact>
                Login
              </NavItem>
            </React.Fragment>
          )}
          {context.token && (
            <React.Fragment>
              <NavItem link="/properties" exact>
                Properties
              </NavItem>
              <NavItem link="/users" exact>
                Users
              </NavItem>
              <NavItem link="/add-property" exact>
                Add Property
              </NavItem>
            </React.Fragment>
          )}
        </ul>
      );
    }}
  </AuthContext.Consumer>
);

export default NavItems;
