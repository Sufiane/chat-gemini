import { IsString } from 'class-validator';

export class AskBodyDto {
    @IsString()
    prompt: string;
}
