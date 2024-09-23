import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class RequestTimeoutInterceptor implements NestInterceptor<Promise<any>> {
    private readonly configService;
    private readonly reflector;
    private readonly maxTimeoutInMilliSecond;
    constructor(configService: ConfigService, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Promise<any> | string>>;
}
