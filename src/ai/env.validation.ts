import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class Env {
    @IsString()
    GEMINI_API_KEY: string;

    @IsString()
    GEMINI_MODEL: string;

    @IsString()
    OPENAI_API_KEY: string;

    @IsString()
    OPENAI_MODEL: string;
}

export const validate = (config: Record<string, unknown>): Env => {
    const validatedConfig = plainToInstance(Env, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
};
