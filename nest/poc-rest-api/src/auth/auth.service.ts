import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    async validateUser(token: any): Promise<any> {
        this.logger.log('** AuthService::validateUser(): validating token: token=' + String(token));
        // TODO Add token validation 
        // TODO we don't know yet what type "token" should be, so using "any" for now
        if ( token === '123.456.789' ) {
            this.logger.log('** AuthService::validateUser(): validation passed');
            return true;
        }
        this.logger.log('** AuthService::validateUser(): validation failed');
        return null
    }

}
