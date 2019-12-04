import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import NavItems from "../NavItems/NavItems";
import "./ToolBar.css";

export class ToolBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      navExpanded: false
    };

    this.setNavExpanded = this.setNavExpanded.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }
  closeNav() {
    this.setState({ navExpanded: false });
  }

  render() {
    return (
      <header className="ToolBar">
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          onToggle={this.setNavExpanded}
          expanded={this.state.navExpanded}
        >
          <Navbar.Brand href="/">
            <img src="../../RealEstateValuator.png" alt="Logo" />
            <span> Real Estate Valuator</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark">
            <Nav className="mr-auto" onSelect={this.closeNav}>
              <NavItems />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
