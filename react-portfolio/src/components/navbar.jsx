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
import LoginModal from "./loginModal.jsx";

class Navbar extends Component {
  state = {
    collapse1: false,
    collapseID: "",
    model14: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
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
      <React.Fragment>
        <MDBNavbar className="fixed-top" transparent color="bg-primary">
          <MDBHamburgerToggler
            color="#FFFFF"
            id="hamburger1"
            onClick={() => this.toggleSingleCollapse("collapse1")}
          />

          <Clocks />

          <MDBCollapse isOpen={this.state.collapse1} navbar>
            <MDBNavbarNav left>
              <NavItem>
                <NavLink className="text-white" exact to="/">
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="text-white" exact to="/projects">
                  Projects
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className="text-white"
                  exact
                  to="#"
                  onClick={() => (
                    <LoginModal
                      model={this.state.model14}
                      onClick={this.state.toggle}
                    />
                  )}
                >
                  Login
                </NavLink>
              </NavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </React.Fragment>
    );
  }
}

export default Navbar;
