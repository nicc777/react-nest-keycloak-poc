import { Injectable } from '@nestjs/common';
import { Fortune } from '../fortune';

@Injectable()
export class FortuneService {

    private readonly fortune: Fortune = new Fortune();

    pickFortune(): Fortune {
        this.fortune.fortuneText = 'Magic is busy happening in the background';
        this.fortune.fortuneAuthor = 'Nico Coetzee';
        return this.fortune;
    }

}
