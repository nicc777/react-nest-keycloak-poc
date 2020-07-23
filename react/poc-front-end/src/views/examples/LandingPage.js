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
  CardImg,
  CardText,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
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
    this.state = { fortune: null, apiAlert: false };
    this.retryFetch = this.retryFetch.bind(this);
    this.fetchFortune = this.fetchFortune.bind(this);
    this.renderRefreshButton = this.renderRefreshButton.bind(this);
    this.renderFortune = this.renderFortune.bind(this);
  }

  componentDidMount() {
    this.fetchFortune();
  }

  fetchFortune(retryAttempt) {
    console.log('fetchFortune(): this.state.apiAlert=', this.state.apiAlert);
    console.log('fetchFortune(): retryAttempt=', retryAttempt);
    try {
      if (this.state.apiAlert == false || retryAttempt) {
        fetch('http://localhost:5000/fortune')
          .then(response => {
            let resp = response.json();
            console.log('resp=', resp)
            return resp;
          })
          .then(data => {
            console.log('data=', data);
            this.setState({ fortune: data, apiAlert: false });
          })
          .catch((error) => {
            console.error('Fetch Error:', error);
            this.setState({ apiAlert: true });
          });
      }
    } catch (e) {
      console.log('error: ', e);
    }
  }

  retryFetch() {
    console.log('retry fetch');
    this.setState({ fortune: null, apiAlert: false });
    this.fetchFortune(true);
  }

  renderLoginButton() {
    if (this.state.apiAlert == true) {
      return (
        <Button className="btn-round" color="danger" outline onClick={this.retryFetch}>
          <i className="fa fa-refresh fa-lg" /> Retry connecting to the API
        </Button>
      );
    } else {
      return (
        <Button className="btn-round" color="primary" outline>
          <i className="fa fa-sign-in fa-lg" /> Login to see the secret
        </Button>
      );
    }
  }

  renderRefreshButton() {
    if (this.state.apiAlert == true) {
      return null;
    } else {
      return (
        <Button className="btn-round" color="primary" outline onClick={this.retryFetch}>
          <i className="fa fa-refresh fa-lg" /> Refresh
        </Button>
    );
    }
    
  }

  renderFortune() {
    if (this.state.fortune !== null) {
      return (
        <Card style={{ width: '40rem' }}>
          <CardImg
            top
            src={require("assets/img/fortune_cookies.jpg")}
            alt="Fortune Cookie Image" />
          <CardBody>
            <CardTitle>Author: {this.state.fortune.fortuneAuthor}</CardTitle>
            <CardText>{this.state.fortune.fortuneText}</CardText>
            {/* <Button color="primary">Go somewhere</Button> */}
          </CardBody>
        </Card>
      );
    } else {
      return this.renderLoginButton();
    }
  }

  renderAlert() {
    if (this.state.apiAlert == true) {
      return (
        <Alert color="danger">
          Failed to reach the API end-point. Is it up?
        </Alert>
      );
    } else {
      return <div></div>
    }
  }

  render() {

    return (
      <>
        <ExamplesNavbar />
        {/* <LandingPageHeader /> */}
        <div className="main">
          <div className="section text-center">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="8">
                  {this.renderAlert()}
                  <h2 className="title">The secret...</h2>
                  <h5 className="description">
                    {this.renderFortune()}
                    {this.renderRefreshButton()}
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
