import { Injectable } from '@nestjs/common';
import { Fortune } from './fortune.entity';

@Injectable()
export class FortuneService {

    private readonly fortune: Fortune = new Fortune();
    private readonly fortunes = [
        { 'text': 'There are no manifestos like cannon and musketry.', 'author': 'The Duke of Wellington' },
        { 'text': '"The fundamental principle of science, the definition almost, is this: the sole test of the validity of any idea is experiment."', 'author': 'Richard P. Feynman' },
        { 'text': 'There is no sin but ignorance.', 'author': 'Christopher Marlowe' },
        { 'text': 'Only two groups of people fall for flattery -- men and women.', 'author': 'unknown' },
        { 'text': 'Avoid the Gates of Hell.  Use Linux', 'author': 'unknown' },
        { 'text': 'Prunes give you a run for your money.', 'author': 'unknown' },
        { 'text': 'It isn\'t easy being a Friday kind of person in a Monday kind of world.', 'author': 'unknown' },
        { 'text': 'Brain off-line, please wait.', 'author': 'unknown' },
        { 'text': 'Wonderful day.  Your hangover just makes it seem terrible.', 'author': 'unknown' },
        { 'text': '"If you own a machine, you are in turn owned by it, and spend your time serving it..."', 'author': 'Marion Zimmer Bradley, _The Forbidden Tower_' },
    ];

    pickFortune(): Fortune {
        var item: any = this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
        this.fortune.fortuneText = item.text;
        this.fortune.fortuneAuthor = item.author;
        return this.fortune;
    }

}
