import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';

@Module({
  providers: [AuthService, HttpStrategy],
  exports: [HttpStrategy]
})
export class AuthModule {}
