import { PromptResponse } from './prompt-response.type';

export interface AiServiceInterface {
    ask(prompt: string): Promise<PromptResponse>;
}
