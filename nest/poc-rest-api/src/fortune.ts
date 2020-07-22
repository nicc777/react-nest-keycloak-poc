import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Fortune implements Readonly<Fortune>{

    @ApiProperty({ example: 'Today you win a prize!', description: 'Your fortune' })
    @IsString()
    fortuneText: string;

    @ApiProperty({ required: false, example: 'John Doe', description: 'The author of the fortune, if known' })
    @IsString()
    fortuneAuthor: string;

}
