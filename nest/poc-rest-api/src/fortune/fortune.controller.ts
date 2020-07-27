import { Controller, Get, UseGuards, Logger } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { Fortune } from './fortune.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('fortune')
export class FortuneController {

    constructor(
        private readonly fortuneService: FortuneService
    ) { }

    private readonly logger = new Logger(FortuneController.name);

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getFortune(): Fortune {
        this.logger.log('called');
        const fortune = this.fortuneService.pickFortune();
        this.logger.log({fortune});
        return fortune;
    }

}
