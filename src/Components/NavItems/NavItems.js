import React from "react";
import AuthContext from "../../Context/auth-context";
import NavItem from "./NavItem/NavItem";
import "./NavItems.css";
import "./NavItem/NavItem.css";

const NavItems = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <ul className="NavItems">
          <NavItem link="/" exact>
            Home
          </NavItem>
          {/* <NavItem link="/calculator" exact>
            Calculator
          </NavItem> */}
          {/* <NavItem link="/map" exact>
            Map
          </NavItem> */}
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
          {context.token && context.isAdmin() && (
            <React.Fragment>
              <NavItem link="/calculator" exact>
                Calculator
              </NavItem>
              <NavItem link="/properties" exact>
                Properties
              </NavItem>
              <NavItem link="/calculatedProperties" exact>
                Calculated Properties
              </NavItem>
              <NavItem link="/users" exact>
                Users
              </NavItem>
            </React.Fragment>
          )}
          {context.token && (
            <React.Fragment>
              <NavItem link="/add-property" exact>
                Add Property
              </NavItem>
              <button onClick={context.logout} className="btn btn-danger">
                Logout
              </button>
            </React.Fragment>
          )}
        </ul>
      );
    }}
  </AuthContext.Consumer>
);

export default NavItems;
