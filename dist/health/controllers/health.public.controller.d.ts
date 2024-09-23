import { MailService } from '@common/mail/services/mail.service';
import { DiskHealthIndicator, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { I18nService } from 'nestjs-i18n';
export declare class HealthPublicController {
    private readonly health;
    private readonly memoryHealthIndicator;
    private readonly diskHealthIndicator;
    private readonly databaseIndicator;
    private readonly mailService;
    private messageService;
    constructor(health: HealthCheckService, memoryHealthIndicator: MemoryHealthIndicator, diskHealthIndicator: DiskHealthIndicator, databaseIndicator: TypeOrmHealthIndicator, mailService: MailService, i18nService: I18nService);
    checkMail(email: string): void;
    checkDatabase(): Promise<{
        data: any;
    }>;
    checkMemoryHeap(): Promise<{
        data: any;
    }>;
    checkMemoryRss(): Promise<{
        data: any;
    }>;
    checkStorage(): Promise<{
        data: any;
    }>;
}
