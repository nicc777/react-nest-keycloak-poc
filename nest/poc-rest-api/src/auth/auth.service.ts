import { Injectable, Logger } from '@nestjs/common';
import { atob } from 'atob';
import { verify } from 'jsonwebtoken';

const auth_key = 'n1bgWXWtu-tp0MrPWDa_YJzYu0iLRT8jOPelyGUvi9lQTLeEtLqc2eauVz5Yvplvxt8WypMNp_rE5bwjLA0F8q_ZYIV-6gd6LJyLIklumTMRLJFhfMvJmsYDkg180d6Fa22DUCmS4UJlgHwbbcGH6BCs2OKxOPK_bU52t9Cf4k6NTPFAsblfw9K_rbgf1hrQP8wwRm0gcVKNb2m5WpziKX0jqCjEaGEBdO1-fFkY9OVl0aj4Ef6RwSUdDrkDfZ6fUfDXww0jWmJGb42dAtwgbCJxu7NluL3n5jYoiNTCpYlg91uxxtgXB_F2gATfPxaOVRTzkx9SiFbTen4zR70K7w';


function parseJwt(token: string): object {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    async validateUser(token: any): Promise<any> {
        this.logger.log('** AuthService::validateUser(): validating token: token=' + String(token));
        // TODO Add token validation 
        // TODO we don't know yet what type "token" should be, so using "any" for now
        if (token === '123.456.789') {
            this.logger.log('** AuthService::validateUser(): validation passed');
            return true;
        } else {
            const jwt_parsed = parseJwt(token);
            const jwt_parsed_json = JSON.stringify(jwt_parsed);
            let log_message = 'jwt_parsed=' + jwt_parsed_json;
            this.logger.log(log_message);
            return true;
        }
        this.logger.log('** AuthService::validateUser(): validation failed');
        return null
    }

}
