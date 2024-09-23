import { SystemService } from '@modules/system/services/system.service';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
export declare class ZaloTokenService {
    private readonly logger;
    private readonly systemService;
    private readonly httpService;
    constructor(logger: Logger, systemService: SystemService, httpService: HttpService);
    getAccessToken(): Promise<string>;
    refreshToken(): Promise<string>;
}
