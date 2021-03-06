import { Module } from '@nestjs/common';
import { FortuneController } from './fortune.controller';
import { FortuneService } from './fortune.service';

@Module({
  controllers: [FortuneController],
  providers: [FortuneService]
})
export class FortuneModule {}
