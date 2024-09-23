import { MailService } from '@common/mail/services/mail.service';
import { WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
export declare class SendMailProcessor extends WorkerHost {
    private readonly logger;
    private readonly mailService;
    constructor(logger: Logger, mailService: MailService);
    onQueueActive(job: Job): void;
    onQueueComplete(job: Job): void;
    onQueueFailed(job: Job, err: any): void;
    onQueueError(e: any): void;
    onQueueStalled(job: Job): void;
    process(job: Job): Promise<void>;
}
