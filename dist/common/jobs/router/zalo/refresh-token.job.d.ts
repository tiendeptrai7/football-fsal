import { ZaloTokenService } from '@modules/zalo/services/zalo.token.service';
import { Logger } from '@nestjs/common';
export declare class RefreshZaloTokenJob {
    private readonly logger;
    private zaloTokenService;
    constructor(logger: Logger, zaloTokenService: ZaloTokenService);
    handleCron(): void;
}
