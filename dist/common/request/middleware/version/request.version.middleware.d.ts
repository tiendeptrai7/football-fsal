import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
export declare class RequestVersionMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly versioningEnable;
    private readonly versioningGlobalPrefix;
    private readonly versioningPrefix;
    private readonly versioningVersion;
    private readonly repoVersion;
    constructor(configService: ConfigService);
    use(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
