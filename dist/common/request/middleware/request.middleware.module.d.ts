import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class RequestMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
