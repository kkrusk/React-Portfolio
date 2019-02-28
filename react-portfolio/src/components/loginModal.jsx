import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";

class LoginModal extends Component {
  render() {
    const { model14, onClick } = this.props;
    return (
      <MDBContainer>
        <MDBModal size="sm" isOpen={model14} toggle={onClick} centered>
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
