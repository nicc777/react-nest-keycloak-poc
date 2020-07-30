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
  CardTitle,
  CardImg,
  CardText,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// Other
import sessionManager from '../../hoc/session-manager';
import crypto from 'crypto';
import qs from 'querystring';
import { Redirect } from "react-router-dom";

const urlBase64 = (content) => {
  content = content.toString('base64');
  const urlSafeReplacements = [
    [/\+/g, '-'],
    [/\//g, '_'],
    [/=/g, '']
  ];

  urlSafeReplacements.forEach(([test, replacement]) => {
    content = content.replace(test, replacement);
  });

  return content;
};

const createCodeVerifier = () => urlBase64(crypto.randomBytes(32));

const createCodeChallenge = (verifier) => {
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return urlBase64(hash);
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('LandingPage:: fetchFortune(): props=', props);
    this.state = { fortune: null, apiAlert: false, apiAlertMessage: null };
    this.retryFetch = this.retryFetch.bind(this);
    this.fetchFortune = this.fetchFortune.bind(this);
    this.renderRefreshButton = this.renderRefreshButton.bind(this);
    this.renderFortune = this.renderFortune.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  componentDidMount() {
    try {
      const tokens = this.props.sessionGet('tokens');
      console.log({ tokens });
      this.fetchFortune();
    } catch (e) {
      console.error({ e });
    }

  }

  fetchFortune(retryAttempt) {
    console.log('LandingPage:: fetchFortune(): this.state.apiAlert=', this.state.apiAlert);
    console.log('LandingPage:: fetchFortune(): retryAttempt=', retryAttempt);
    try {
      const tokens = JSON.parse(this.props.sessionGet('tokens'));
      console.log({tokens});
      if (this.state.apiAlert === false || retryAttempt) {
        const fetchData = {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            // 'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer ' + tokens.access_token
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          // body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        fetch('http://localhost:5000/fortune', fetchData)
          .then(response => {
            let resp = response.json();
            console.log('LandingPage:: fetchFortune(): resp=', resp)
            return resp;
          })
          .then(data => {
            console.log('LandingPage:: getAuthorizationCode(): data=', data);
            if (data.fortuneText) {
              // success
              this.setState({ fortune: data, apiAlert: false, apiAlertMessage: null });
              console.log('LandingPage:: fetchFortune(): API FETCH SUCCESS');
            } else {
              this.setState({apiAlert: true, apiAlertMessage: 'It appears you are not authorized. Logout and back in again.'});
              this.props.sessionRemove('tokens'); // Remove tokens since it's no longer valid
              console.log('LandingPage:: fetchFortune(): API FETCH FAIL. HTTP Status Code: ', data.statusCode);
            }
          })
          .catch((error) => {
            console.error('LandingPage:: fetchFortune(): Fetch Error:', error);
            this.setState({ apiAlert: true });
          });
      }
    } catch (e) {
      console.log('error: ', e);
    }
  }

  retryFetch() {
    console.log('LandingPage:: retryFetch(): retry fetch');
    this.setState({ fortune: null, apiAlert: false, apiAlertMessage: null });
    this.fetchFortune(true);
  }


  getAuthorizationCode = async (keycloakUrl, clientId, redirectUri, challenge) => {
    const params = qs.stringify({
      response_type: 'code',
      scope: 'openid profile email',
      client_id: clientId,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      redirect_uri: redirectUri
    });

    console.log('LandingPage:: getAuthorizationCode():  params=', params);
    const loginUrl = keycloakUrl + '?' + params;
    this.props.sessionSet('loginUrl', loginUrl);
    return loginUrl;
  };

  async redirectToLogin() {
    console.log('LandingPage:: redirectToLogin(): Attempting to redirect to the login page');


    const verifier = createCodeVerifier();
    const challenge = createCodeChallenge(verifier);
    console.log('LandingPage:: redirectToLogin(): verifier=', verifier);
    console.log('LandingPage:: redirectToLogin(): challenge=', challenge);

    this.getAuthorizationCode(
      'http://localhost:8180/auth/realms/master/protocol/openid-connect/auth',  //keycloakUrl
      'poc-front-end',                                                          // clientId 
      'http://localhost:3000/callback',                                         // redirectUri
      challenge                                                                 // challenge
    );
    this.props.sessionSet('verifier', verifier);
    this.setState({ redirect: true });
  }

  renderLoginButton() {
    if (this.state.apiAlert === true) {
      // return (
      //   <Button className="btn-round" color="danger" outline onClick={this.retryFetch}>
      //     <i className="fa fa-refresh fa-lg" /> Retry connecting to the API
      //   </Button>
      // );
      return (
        <Button className="btn-round" color="primary" outline onClick={this.redirectToLogin}>
          <i className="fa fa-sign-in fa-lg" /> Login to see the secret
        </Button>
      );
    } else {
      return (
        <Button className="btn-round" color="primary" outline onClick={this.redirectToLogin}>
          <i className="fa fa-sign-in fa-lg" /> Login to see the secret
        </Button>
      );
    }
  }

  renderRefreshButton() {
    if (this.state.apiAlert === true) {
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
    if (this.state.apiAlert === true) {
      let alertMessage = 'Failed to reach the API end-point. Is it up?';
      if (this.state.apiAlertMessage) {
        alertMessage = this.state.apiAlertMessage;
      }
      return (
        <Alert color="danger">
          {alertMessage}
        </Alert>
      );
    } else {
      return <div></div>
    }
  }


  renderRedirectToLogin(loginUrl) {
    return (
      <div>
        <Redirect to={loginUrl} />
      </div>
    );
  }

  render() {

    if (this.props.sessionGet('loginUrl')) {
      const loginUrl = this.props.sessionGet('loginUrl');
      this.props.sessionRemove('loginUrl');
      window.location.href = loginUrl;
    }

    console.log('Final Render');
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
