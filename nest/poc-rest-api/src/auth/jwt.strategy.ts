import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 100,
        jwksUri: 'http://localhost:8180/auth/realms/master/protocol/openid-connect/certs',
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'http://localhost:3000',
      issuer: 'http://localhost:8180/auth/realms/master',
      algorithms: ['RS256'],
    });
    this.logger.log('initialized');
  }

  private readonly logger = new Logger(JwtStrategy.name);

  validate(payload: any) {
    this.logger.log('called');
    this.logger.log({payload});
    return payload;
  }
}