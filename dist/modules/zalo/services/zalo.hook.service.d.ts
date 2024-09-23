import { Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ZaloHookPayload } from '../types/zalo.type';
import { ZaloService } from './zalo.service';
export declare class ZaloHookService {
    private readonly logger;
    private readonly zaloService;
    private zaloMessage;
    constructor(logger: Logger, i18nService: I18nService, zaloService: ZaloService);
    processZaloHook(body: ZaloHookPayload): Promise<void>;
    _recordMessage(body: ZaloHookPayload): Promise<void>;
}
