import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async validateUser(token: any) {
        // TODO Add token validation 
        // TODO we don't know yet what type "token" should be, so using "any" for now
    }

}
