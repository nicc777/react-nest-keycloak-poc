import { Controller, Get } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { FortuneService } from './fortune.service';
import { Fortune } from '../fortune';

@Controller('fortune')
export class FortuneController {

    constructor(
        private readonly fortuneService: FortuneService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get a Fortune' })
    @ApiResponse({
        status: 200,
        description: 'The retrieved fortune',
        type: Fortune,
    })
    getFortune(): Fortune {
        return this.fortuneService.pickFortune();
    }

}
