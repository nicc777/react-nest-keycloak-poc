import { Module } from '@nestjs/common';
import { FortuneController } from './fortune.controller';
import { FortuneService } from './fortune.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [FortuneController],
    providers: [FortuneService],
})
export class FortuneModule { }
