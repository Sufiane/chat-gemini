import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AskBodyDto } from './ai.dto';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('/ask')
    async ask(@Body() { prompt }: AskBodyDto) {
        return this.aiService.ask(prompt);
    }
}
