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

// const exchangeCodeForTokens = (keycloakUrl, redirectUri, clientId, code, verifier, removeVerifier = false) => {
//   const body = {
//     grant_type: 'authorization_code',
//     client_id: clientId,
//     code_verifier: verifier,
//     code,
//     redirect_uri: redirectUri
//   };

//   if (removeVerifier) {
//     delete body.code_verifier;
//   }

//   return fetch(`${keycloakUrl}/protocol/openid-connect/token`, {
//     body: qs.stringify(body),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     method: 'POST',
//     redirect: 'manual'
//   });
// };

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('props=', props);
    this.state = { fortune: null, apiAlert: false };
    this.retryFetch = this.retryFetch.bind(this);
    this.fetchFortune = this.fetchFortune.bind(this);
    this.renderRefreshButton = this.renderRefreshButton.bind(this);
    this.renderFortune = this.renderFortune.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  componentDidMount() {
    try {
      const tokens = this.props.sessionGet('tokens');
      console.log({tokens});
      this.fetchFortune();
    } catch (e) {
      console.error({e});
    }
    
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
            if (data.statusCode >= 200 && data.statusCode < 300) {
              // success
              this.setState({ fortune: data, apiAlert: false });
            } else {
              // some error condition
              console.log('The server returned an error!!');
            }
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


  getAuthorizationCode = async (keycloakUrl, clientId, redirectUri, challenge) => {
    const params = qs.stringify({
      response_type: 'code',
      scope: 'openid profile email',
      client_id: clientId,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      redirect_uri: redirectUri
    });

    console.log('getAuthorizationCode(): params=', params);
    const loginUrl = keycloakUrl + '?' + params;
    this.props.sessionSet('loginUrl', loginUrl);
    return loginUrl;
  };

  async redirectToLogin() {
    console.log('Attempting to redirect to the login page');


    const verifier = createCodeVerifier();
    const challenge = createCodeChallenge(verifier);
    console.log('verifier=', verifier);
    console.log('challenge=', challenge);

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
    if (this.state.apiAlert == true) {
      return (
        <Button className="btn-round" color="danger" outline onClick={this.retryFetch}>
          <i className="fa fa-refresh fa-lg" /> Retry connecting to the API
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
      console.log('** REDIRECT to login: ', loginUrl);
      window.location.href = loginUrl;
    }

    console.log('Final Render');
    return (
      <>
        {/* {loginUrl ? <Redirect to="{loginUrl}">REDIRECT</Redirect> : null} */}
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
