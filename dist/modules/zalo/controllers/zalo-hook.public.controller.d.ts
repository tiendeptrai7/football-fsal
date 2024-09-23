import { Response } from 'express';
import { ZaloHookService } from '../services/zalo.hook.service';
import { ZaloHookPayload } from '../types/zalo.type';
export declare class ZaloHookPublicController {
    private readonly service;
    constructor(service: ZaloHookService);
    zaloHook(body: ZaloHookPayload): void;
    zaloVerify(res: Response): Response<any, Record<string, any>>;
}
