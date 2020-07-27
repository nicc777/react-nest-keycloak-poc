import { IsString } from 'class-validator';

export class Fortune implements Readonly<Fortune>{

    @IsString()
    fortuneText: string;

    @IsString()
    fortuneAuthor: string;

}