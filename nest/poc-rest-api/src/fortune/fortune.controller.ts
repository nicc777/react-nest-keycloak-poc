import { Controller, Get } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { Fortune } from './fortune.entity';

@Controller('fortune')
export class FortuneController {

    constructor(
        private readonly fortuneService: FortuneService
    ) { }

    @Get()
    getFortune(): Fortune {
        return this.fortuneService.pickFortune();
    }

}
