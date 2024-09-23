import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
export declare class LoggerHttpMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly logger;
    private readonly writeIntoFile;
    private readonly writeIntoConsole;
    constructor(configService: ConfigService, logger: Logger);
    private createStream;
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class LoggerHttpWriteIntoFileMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly writeIntoFile;
    private readonly maxSize;
    private readonly maxFiles;
    constructor(configService: ConfigService);
    private httpLogger;
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class LoggerHttpWriteIntoConsoleMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly writeIntoConsole;
    constructor(configService: ConfigService);
    private httpLogger;
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class LoggerHttpResponseMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly writeIntoFile;
    private readonly writeIntoConsole;
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): void;
}
