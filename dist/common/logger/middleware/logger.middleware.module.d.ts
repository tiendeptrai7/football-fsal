import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class LoggerMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
