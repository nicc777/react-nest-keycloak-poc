import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { FortuneService } from './fortune.service';
import { Fortune } from '../fortune';
import { AuthGuard } from '@nestjs/passport';

@Controller('fortune')
export class FortuneController {

    constructor(
        private readonly fortuneService: FortuneService
    ) { }

    private readonly logger = new Logger(FortuneController.name);

    @Get()
    @ApiOperation({ summary: 'Get a Fortune' })
    @ApiResponse({
        status: 200,
        description: 'The retrieved fortune',
        type: Fortune,
    })
    @UseGuards(AuthGuard('bearer'))
    getFortune(): Fortune {
        this.logger.log('** FortuneController::getFortune(): Requesting a fortune');
        return this.fortuneService.pickFortune();
    }

}
