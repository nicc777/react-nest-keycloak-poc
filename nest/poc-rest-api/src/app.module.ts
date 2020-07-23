import { Module } from '@nestjs/common';
import { FortuneModule } from './fortune/fortune.module';
import { AuthModule } from './auth/auth.module';
import { HttpStrategy } from './auth/http.strategy';

@Module({
  imports: [FortuneModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
