import React from "react";
import { Redirect } from "react-router-dom";
import sessionManager from '../hoc/session-manager';
import Keycloak from 'keycloak-js';
import qs from 'querystring';


class Callback extends React.Component {
    constructor(props) {
        super(props);
        console.log('Callback::constructor(): props=', props);
        console.log('Callback::constructor(): this.props.location.hash=', this.props.location.hash);
        // EXPECTING http://localhost:3000/callback?session_state=a63586a4-1797-46c8-b985-251bdf6b0a49&code=35734e73-90e8-497e-8250-702170127a5a.a63586a4-1797-46c8-b985-251bdf6b0a49.cb00b7f4-5cee-464b-99b8-cf839677fa18
        console.log('Callback::constructor(): this.props.location.search=', this.props.location.search);
        const query_string_params = qs.parse(this.props.location.search.substr(1));
        console.log({query_string_params});
        const verifier = this.props.sessionGet('verifier');
        console.log({verifier});
        this.state = {
            query_string_params: query_string_params,
            verifier: verifier
        }
    }

    async componentDidMount() {
        const tokens = await this.getTokens(this.state.query_string_params.code, this.state.verifier);
        console.log({tokens});
    }

    /**
     * @param {Object} object
     * @return {string}
     */
    toFormUrlEncoded(object) {
        return Object.entries(object)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    async postData(url = '', data = {}) {
        try {
            let token_data= null;
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
                body: this.toFormUrlEncoded(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log({data});
                token_data = data;
            });
            return token_data; // parses JSON response into native JavaScript objects
        } catch (e) {
            console.log('Callback::postData(): error: ', e)
        }
        return { tokens: null }
    }

    async getTokens(code, verifier) {
        try {
            this.postData(
                'http://localhost:8180/auth/realms/master/protocol/openid-connect/token',
                {
                    client_id: 'poc-front-end',
                    code_verifier: verifier,
                    code: code,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:3000/callback'
                }
            )
            .then(data => {
                console.log('Callback::getTokens(): Returned token data=', data); // JSON data parsed by `data.json()` call
                if (data) {
                    this.props.sessionSet('tokens', JSON.stringify(data));
                } else {
                    this.props.sessionRemove('tokens');
                }
                this.props.sessionRemove('code');
                this.props.sessionRemove('session_state');
                this.props.sessionRemove('verifier');
                return data;
            });
        } catch (e) {
            console.log('Callback::getTokens(): error: ', e)
        }
        return { tokens: null }
    }

    render() {

        console.log('Callback::render(): keycloak=', this.keycloak);
        console.log('Callback::render(): Going back home...');
        return <Redirect to="/" />
        // return (
        //     <div>
        //         waiting... 
        //     </div>
        // );
    }

}

const ManagedCallback = sessionManager(Callback);

export default ManagedCallback;
