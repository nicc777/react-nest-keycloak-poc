import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from "./auth.service";

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
      super();
    }
    
    private readonly logger = new Logger(HttpStrategy.name);

    async validate(token: any, done): Promise<any>{
        this.logger.log('** HttpStrategy::validate(): validating token: token=' + String(token));
        const authResult: any = await this.authService.validateUser(token);
        this.logger.log('** HttpStrategy::validate(): authResult=' + String(authResult));
        if (authResult !== null ) {
            this.logger.log('** HttpStrategy::validate(): token validation passed');
            return done(null, 'user', { scope: 'all' });
        }
        this.logger.log('** HttpStrategy::validate(): token validation failed');
        return done(new UnauthorizedException(), false);
    }
}