import { AiService } from './ai.service';
import { OpenaiModule } from './openai/openai.module';
import { Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';
import { AiController } from './ai.controller';

@Module({
    imports: [GeminiModule, OpenaiModule],
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
})
export class AiModule {}
