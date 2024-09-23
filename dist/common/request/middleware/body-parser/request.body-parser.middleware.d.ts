import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
export declare class RequestUrlencodedBodyParserMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly maxFile;
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare class RequestJsonBodyParserMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly maxFile;
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare class RequestRawBodyParserMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly maxFile;
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare class RequestTextBodyParserMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly maxFile;
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): void;
}
