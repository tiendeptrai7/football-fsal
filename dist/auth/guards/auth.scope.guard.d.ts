import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
export declare class AuthScopeGuard implements CanActivate {
    private readonly reflector;
    private readonly authMessage;
    constructor(reflector: Reflector, i18nService: I18nService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
