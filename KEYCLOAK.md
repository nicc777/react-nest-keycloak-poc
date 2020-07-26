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

Getting the certificates of the server:

```bash
$ curl http://localhost:8180/auth/realms/master/protocol/openid-connect/certs
```

Result:

```json
{
    "keys": [
        {
            "kid": "K1NPa9nd58Nnf1Q1dzGnKqQKp4DL_Sz94Tox1hCYm8A",
            "kty": "RSA",
            "alg": "RS256",
            "use": "sig",
            "n": "n1bgWXWtu-tp0MrPWDa_YJzYu0iLRT8jOPelyGUvi9lQTLeEtLqc2eauVz5Yvplvxt8WypMNp_rE5bwjLA0F8q_ZYIV-6gd6LJyLIklumTMRLJFhfMvJmsYDkg180d6Fa22DUCmS4UJlgHwbbcGH6BCs2OKxOPK_bU52t9Cf4k6NTPFAsblfw9K_rbgf1hrQP8wwRm0gcVKNb2m5WpziKX0jqCjEaGEBdO1-fFkY9OVl0aj4Ef6RwSUdDrkDfZ6fUfDXww0jWmJGb42dAtwgbCJxu7NluL3n5jYoiNTCpYlg91uxxtgXB_F2gATfPxaOVRTzkx9SiFbTen4zR70K7w",
            "e": "AQAB",
            "x5c": [
                "MIICmzCCAYMCBgFzdkIsyDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjAwNzIyMTEyMDE1WhcNMzAwNzIyMTEyMTU1WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfVuBZda2762nQys9YNr9gnNi7SItFPyM496XIZS+L2VBMt4S0upzZ5q5XPli+mW/G3xbKkw2n+sTlvCMsDQXyr9lghX7qB3osnIsiSW6ZMxEskWF8y8maxgOSDXzR3oVrbYNQKZLhQmWAfBttwYfoEKzY4rE48r9tTna30J/iTo1M8UCxuV/D0r+tuB/WGtA/zDBGbSBxUo1vablanOIpfSOoKMRoYQF07X58WRj05WXRqPgR/pHBJR0OuQN9np9R8NfDDSNaYkZvjZ0C3CBsInG7s2W4vefmNiiI1MKliWD3W7HG2BcH8XaABN8/Fo5VFPOTH1KIVtN6fjNHvQrvAgMBAAEwDQYJKoZIhvcNAQELBQADggEBADYCpagcYA5TaESfEJ471Gv+f7HxqSAj2w1AWYnF/tC8U6dQAJvcL+UM1RQNzMc8KOCMWUNbDoj+wXoFbxUOJN/AOj6iFBJ6BUQc9Ltl3NJFOJCg8AGbJ6EUlMbxf5QJZHzOG1SPok5dCafY3mP1uruvNfzm3g4vRUcrOWxHOTDFwNOg5rDjc1e2egKZYhWS47gqXlr88gVx5Hf22A+r25UkD9BJYbwgelNR8cMCmbaodX3mc6nOn3M7T0uCMp9L+w9L1l1m2H3UOTvvYiNs1+Wl3NppmfHV6HMTXrKRKscVaVXplmzp6ARoj3pxXe7Q0vN2KgBB2edaUkXY4wgV1OQ="
            ],
            "x5t": "Tgn3NswfUdaoBgYq2SNK65Ib5QY",
            "x5t#S256": "wZ_kSH95aLNt1RTdce2FAz1taU44s5Z8p2fTPZInv1I"
        }
    ]
}
```

