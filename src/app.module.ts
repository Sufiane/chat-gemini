import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { validate } from './ai/env.validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true,
        }),
        AiModule,
    ],
})
export class AppModule {}
