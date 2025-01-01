import { Injectable, Logger } from '@nestjs/common';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { AiServiceInterface } from '../types/interface';
import { PromptResponse } from '../types/prompt-response.type';

@Injectable()
export class GeminiService implements AiServiceInterface {
    private readonly logger = new Logger(GeminiService.name);
    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;

    constructor(
        private readonly configService: ConfigService<
            {
                GEMINI_API_KEY: string;
                GEMINI_MODEL: string;
            },
            true
        >,
    ) {
        this.genAI = new GoogleGenerativeAI(this.configService.get('GEMINI_API_KEY'));
        this.model = this.genAI.getGenerativeModel({
            model: this.configService.get('GEMINI_MODEL'),
        });
    }

    async ask(prompt: string): Promise<PromptResponse> {
        try {
            const result = await this.model.generateContent(prompt);

            this.logger.log(`Gemini response: ${result.response.text()})`);

            return {
                success: true,
                response: result.response.text()
            };
        } catch (error) {
            this.logger.error('Error while asking gemini', {
                error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
            });

            return {
                success: false,
                response: 'Error while asking gemini. Please try again later.'
            };
        }
    }
}
