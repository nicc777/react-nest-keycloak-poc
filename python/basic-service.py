from flask import Flask
from flask import request
from flask_restful import Resource, Api
import random
import urllib.request
import json
import python_jwt as jwt, jwcrypto.jwk as jwk
import datetime
from keycloak import KeycloakOpenID


app = Flask(__name__)
api = Api(app)

keycloak_openid = KeycloakOpenID(server_url="http://localhost:8180/auth/", client_id="poc-front-end", realm_name="master")
certs = keycloak_openid.certs()
print('certs={}'.format(certs))
KEYCLOAK_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' + keycloak_openid.public_key() + '\n-----END PUBLIC KEY-----'
print('KEYCLOAK_PUBLIC_KEY={}'.format(KEYCLOAK_PUBLIC_KEY))


FORTUNES = [
    {'text': 'There are no manifestos like cannon and musketry.',
        'author': 'The Duke of Wellington'},
    {'text': '"The fundamental principle of science, the definition almost, is this: the sole test of the validity of any idea is experiment."',
        'author': 'Richard P. Feynman'},
    {'text': 'There is no sin but ignorance.', 'author': 'Christopher Marlowe'},
    {'text': 'Only two groups of people fall for flattery -- men and women.',
        'author': 'unknown'},
    {'text': 'Avoid the Gates of Hell.  Use Linux', 'author': 'unknown'},
    {'text': 'Prunes give you a run for your money.', 'author': 'unknown'},
    {'text': 'It isn\'t easy being a Friday kind of person in a Monday kind of world.',
        'author': 'unknown'},
    {'text': 'Brain off-line, please wait.', 'author': 'unknown'},
    {'text': 'Wonderful day.  Your hangover just makes it seem terrible.',
        'author': 'unknown'},
    {'text': '"If you own a machine, you are in turn owned by it, and spend your time serving it..."',
        'author': 'Marion Zimmer Bradley, _The Forbidden Tower_'},
]

class Fortune(Resource):
    def get(self):
        if 'Authorization' in request.headers:
            bearer_token = request.headers['Authorization'][7:]
            print('bearer_token: {}'.format(bearer_token))
            options = {"verify_signature": True, "verify_aud": False, "exp": True}
            token_info = keycloak_openid.decode_token(bearer_token, key=KEYCLOAK_PUBLIC_KEY, options=options)
            print('token_info={}'.format(token_info))


        fortune = FORTUNES[random.randint(0, len(FORTUNES) - 1)]
        return {
            'fortuneAuthor': fortune['author'],
            'fortuneText': fortune['text'],
        }


api.add_resource(Fortune, '/fortune')

if __name__ == '__main__':
    app.run(debug=True)
