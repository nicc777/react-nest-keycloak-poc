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
        // TODO validate token using this.authService
        this.logger.log('** HttpStrategy::validate(): validating token: token=' + String(token));
        done(new UnauthorizedException(), false);
    }
}