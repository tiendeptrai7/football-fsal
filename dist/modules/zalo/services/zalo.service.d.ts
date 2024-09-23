import { ZaloTokenService } from '@modules/zalo/services/zalo.token.service';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ZaloOfficialAccountResponse, ZaloUserResponse } from '../types/zalo.response.type';
export declare class ZaloService {
    private readonly httpService;
    private readonly logger;
    private readonly zaloTokenService;
    constructor(httpService: HttpService, logger: Logger, zaloTokenService: ZaloTokenService);
    getUserDetail(zaloID: string, isRetry?: boolean): Promise<ZaloUserResponse>;
    getOa(isRetry?: boolean): Promise<ZaloOfficialAccountResponse>;
}
