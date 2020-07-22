import { Module } from '@nestjs/common';
import { FortuneController } from './fortune/fortune.controller';
import { FortuneService } from './fortune/fortune.service';

@Module({
  imports: [],
  controllers: [FortuneController],
  providers: [FortuneService],
})
export class AppModule {}
