import React from "react";
import NavItem from "./NavItem/NavItem";
import "./NavItems.css";

const NavItems = props => (
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
    <NavItem link="/register" exact>
      Sign Up
    </NavItem>
    <NavItem link="/login" exact>
      Login
    </NavItem>
    <NavItem link="/properties" exact>
      Properties
    </NavItem>
    <NavItem link="/users" exact>
      Users
    </NavItem>
    <NavItem link="/add-property" exact>
      Add Property
    </NavItem>
  </ul>
);

export default NavItems;
