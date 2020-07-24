/* 
    Using React Keycloak ~~ https://www.npmjs.com/package/@react-keycloak/web

*/

import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak(
    { 
        url: 'http://localhost:8180/auth',
        realm: 'master',
        clientId: 'poc-front-end' 
    }
);
 
export default keycloak