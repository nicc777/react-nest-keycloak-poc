import { Module } from '@nestjs/common';
import { FortuneModule } from './fortune/fortune.module';

@Module({
  imports: [FortuneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
