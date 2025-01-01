import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { AiServiceInterface } from '../types/interface';
import { PromptResponse } from '../types/prompt-response.type';

@Injectable()
export class OpenaiService implements AiServiceInterface {
    private readonly logger = new Logger(OpenaiService.name);
    private openAi: OpenAI;

    constructor(
        private readonly configService: ConfigService<
            {
                OPENAI_API_KEY: string;
                OPENAI_MODEL: string;
            },
            true
        >,
    ) {
        this.openAi = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }

    async ask(prompt: string): Promise<PromptResponse> {
        try {
            const completion = await this.openAi.chat.completions.create({
                model: this.configService.get('OPENAI_MODEL'),
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });

            this.logger.log(`OpenAI response: ${completion.choices[0].message.content})`);

            return {
                success: true,
                response: completion.choices[0].message.content,
            };
        } catch (error) {
            this.logger.error('Error while asking openAI', {
                error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
            });

            return {
                success: false,
                response: 'Error while asking openAI. Please try again later.',
            };
        }
    }
}
