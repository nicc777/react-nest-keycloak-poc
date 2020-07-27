import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
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

      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      // audience: 'http://localhost:5000/',
      // issuer: 'http://localhost:8180/',
      algorithms: ['RS256'],
    });
    this.logger.log('initialized');
  }

  private readonly logger = new Logger(JwtStrategy.name);

  validate(payload: any, done: VerifiedCallback) {
    this.logger.log('called');
    this.logger.log({ payload });
    if (!payload) {
      done(new UnauthorizedException(), false);
    }

    return done(null, payload);
  }

}