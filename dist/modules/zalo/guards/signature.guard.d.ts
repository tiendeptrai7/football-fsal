import { SystemService } from '@modules/system/services/system.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SignatureGuard implements CanActivate {
    private readonly systemService;
    constructor(configService: ConfigService, systemService: SystemService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
