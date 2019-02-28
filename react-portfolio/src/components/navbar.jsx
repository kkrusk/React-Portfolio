import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBCollapse,
  MDBHamburgerToggler
} from "mdbreact";
import Clocks from "./clock.jsx";

class Navbar extends Component {
  state = {
    collapse1: false,
    collapseID: ""
  };

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  };

  toggleSingleCollapse = collapseId => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  };

  render() {
    return (
      <MDBNavbar className="fixed-top">
        <Clocks />
        <MDBHamburgerToggler
          color="#FFFFF"
          id="hamburger1"
          onClick={() => this.toggleSingleCollapse("collapse1")}
        />

        <MDBCollapse isOpen={this.state.collapse1} navbar>
          <MDBNavbarNav left>
            <NavItem>
              <NavLink className="text-white" exact to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="text-white" exact to="/Projects">
                Projects
              </NavLink>
            </NavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navbar;
