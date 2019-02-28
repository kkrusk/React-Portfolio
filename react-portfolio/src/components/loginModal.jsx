import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

class LoginModal extends Component {
  state = {
    modal14: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return (
      <MDBContainer>
        <MDBModal
          size="sm"
          isOpen={this.state.modal14}
          toggle={this.toggle(14)}
          centered
        >
          <MDBModalHeader toggle={this.toggle(14)}>Login</MDBModalHeader>
          <MDBModalBody>Login Here</MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary">Login</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default LoginModal;
