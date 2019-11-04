import React from "react";
import NavItems from "../NavItems/NavItems";
import "./ToolBar.css";

const ToolBar = () => (
  <header className="ToolBar">
    <p>menu</p>
    <p id="Logo">LOGO</p>
    <nav className="NavBar">
      <NavItems />
    </nav>
  </header>
);

export default ToolBar;
