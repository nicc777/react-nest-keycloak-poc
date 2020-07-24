# Getting the real configuration

This is required to get some endpoint details:

```bash
$ curl -X GET http://localhost:8180/auth/realms/master/.well-known/openid-configuration
```

Returned data:

```json
{
    "issuer": "http://localhost:8180/auth/realms/master",
    "authorization_endpoint": "http://localhost:8180/auth/realms/master/protocol/openid-connect/auth",
    "token_endpoint": "http://localhost:8180/auth/realms/master/protocol/openid-connect/token",
    "token_introspection_endpoint": "http://localhost:8180/auth/realms/master/protocol/openid-connect/token/introspect",
    "userinfo_endpoint": "http://localhost:8180/auth/realms/master/protocol/openid-connect/userinfo",
    "end_session_endpoint": "http://localhost:8180/auth/realms/master/protocol/openid-connect/logout",
    "jwks_uri": "http://localhost:8180/auth/realms/master/protocol/openid-connect/certs",
    "check_session_iframe": "http://localhost:8180/auth/realms/master/protocol/openid-connect/login-status-iframe.html",
    "grant_types_supported": [ ... ],
    "response_types_supported": [ ...],
    "subject_types_supported": [ ... ],
    "id_token_signing_alg_values_supported": [ ... ],
    "id_token_encryption_alg_values_supported": [ ... ],
    "id_token_encryption_enc_values_supported": [ ... ],
    "userinfo_signing_alg_values_supported": [ ... ],
    "request_object_signing_alg_values_supported": [ ... ],
    "response_modes_supported": [ ... ],
    "registration_endpoint": "http://localhost:8180/auth/realms/master/clients-registrations/openid-connect",
    "token_endpoint_auth_methods_supported": [
        "private_key_jwt",
        "client_secret_basic",
        "client_secret_post",
        "tls_client_auth",
        "client_secret_jwt"
    ],
    "token_endpoint_auth_signing_alg_values_supported": [ ... ],
    "claims_supported": [
        "aud",
        "sub",
        "iss",
        "auth_time",
        "name",
        "given_name",
        "family_name",
        "preferred_username",
        "email",
        "acr"
    ],
    "claim_types_supported": [
        "normal"
    ],
    "claims_parameter_supported": false,
    "scopes_supported": [
        "openid",
        "address",
        "email",
        "microprofile-jwt",
        "offline_access",
        "phone",
        "profile",
        "roles",
        "web-origins"
    ],
    "request_parameter_supported": true,
    "request_uri_parameter_supported": true,
    "code_challenge_methods_supported": [
        "plain",
        "S256"
    ],
    "tls_client_certificate_bound_access_tokens": true,
    "introspection_endpoint": "http://localhost:8180/auth/realms/master/protocol/openid-connect/token/introspect"
}
```


