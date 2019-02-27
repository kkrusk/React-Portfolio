import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler
} from "mdbreact";

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
      <div>
        <MDBNavbar color="amber lighten-4" style={{ marginTop: "20px" }} light>
          <MDBContainer>
            <MDBNavbarBrand>MDBNavbar</MDBNavbarBrand>
            <MDBHamburgerToggler
              color="#d3531a"
              id="hamburger1"
              onClick={() => this.toggleSingleCollapse("collapse1")}
            />
            <MDBCollapse isOpen={this.state.collapse1} navbar>
              <MDBNavbarNav left>
                <NavItem>
                  <NavLink exact to="/">
                    Home
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink exact to="/Projects">
                    Projects
                  </NavLink>
                </NavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </div>
    );
  }
}

export default Navbar;
