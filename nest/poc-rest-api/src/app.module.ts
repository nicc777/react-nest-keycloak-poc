import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FortuneModule } from './fortune/fortune.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FortuneModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
