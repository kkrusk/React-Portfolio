import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { SocialIcon } from "react-social-icons";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6" />

          <MDBCol md="6" />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <SocialIcon url="http://github.com/kkrusk" />
        <SocialIcon url="https://www.linkedin.com/in/kyle-kruskamp-441645148/" />
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Kyle Kruskamp
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
