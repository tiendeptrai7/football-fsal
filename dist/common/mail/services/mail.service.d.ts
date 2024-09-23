import { SystemRepository } from '@modules/system/repository/repositories/system.repository';
import { Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { BlankTemplate } from '../templates/bank-template';
import { ResetPasswordTemplate } from '../templates/reset-password-template';
import { MailOptions } from '../types/mail';
export declare class MailService {
    private readonly logger;
    private readonly systemRepository;
    private readonly mailQueue;
    private mailConfig;
    constructor(logger: Logger, systemRepository: SystemRepository, mailQueue: Queue);
    sendBlankTemplate(parameter: BlankTemplate): void;
    sendResetPassword(data: ResetPasswordTemplate): void;
    sendNoReply(data: MailOptions): Promise<void>;
    private _sendMail;
    private _getMailConfig;
    private _getTransporter;
}
