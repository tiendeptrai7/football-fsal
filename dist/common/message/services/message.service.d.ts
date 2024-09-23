import { I18nService } from 'nestjs-i18n';
export declare class MessageService {
    private readonly i18n;
    _context: string;
    constructor(i18n: I18nService, context?: string);
    get(key: string, context?: string, options?: Record<string, string | number>): string;
}
