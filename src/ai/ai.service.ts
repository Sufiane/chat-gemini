import { Injectable } from '@nestjs/common';
import { GeminiService } from './gemini/gemini.service';
import { OpenaiService } from './openai/openai.service';
import { PromptResponse } from './types/prompt-response.type';

@Injectable()
export class AiService {
    constructor(
        private readonly openaiService: OpenaiService,
        private readonly geminiService: GeminiService,
    ) {
    }

    async ask(prompt: string): Promise<{
        openAi: PromptResponse;
        gemini: PromptResponse
    }> {
        const [openAiResponse, geminiResponse] = await Promise.all([
            this.openaiService.ask(prompt),
            this.geminiService.ask(prompt),
        ]);

        return {
            openAi: openAiResponse,
            gemini: geminiResponse,
        };
    }
}
