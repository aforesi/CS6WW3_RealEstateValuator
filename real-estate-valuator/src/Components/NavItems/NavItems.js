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
  </ul>
);

export default NavItems;
