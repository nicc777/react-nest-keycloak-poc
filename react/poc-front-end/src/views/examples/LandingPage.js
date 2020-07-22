/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// Other
import sessionManager from '../../hoc/session-manager';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  renderLoginButton() {
    return (
      <Button className="btn-round" color="primary" outline>
        <i className="fa fa-sign-in fa-lg" />
        Login to see the secret
      </Button>
    );
  }


  render() {

    const secretTextHolder = this.renderLoginButton();

    return (
      <>
        <ExamplesNavbar />
        <LandingPageHeader />
        <div className="main">
          <div className="section text-center">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="8">
                  <h2 className="title">The secret...</h2>
                  <h5 className="description">
                    {secretTextHolder}
                  </h5>
                  <br />
                </Col>
              </Row>
              <br />
              <br />
            </Container>
          </div>
        </div>
        <DemoFooter />
      </>
    );
  }
}

const ManagedLandingPage = sessionManager(LandingPage);

export default ManagedLandingPage;

// export default LandingPage;
