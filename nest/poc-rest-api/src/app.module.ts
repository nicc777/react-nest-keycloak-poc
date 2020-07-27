import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FortuneModule } from './fortune/fortune.module';

@Module({
  imports: [FortuneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
