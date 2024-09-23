import { MailService } from '@common/mail/services/mail.service';
import { User } from '@modules/user/repository/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { EmailToken } from '../repository/entities/email-token.entity';
import { EmailTokenRepository } from '../repository/repositories/email-token.repository';
export declare class AuthEmailTokenService {
    private readonly mailService;
    private readonly jwtService;
    private readonly configService;
    private readonly emailTokenRepository;
    private readonly messageService;
    constructor(mailService: MailService, jwtService: JwtService, configService: ConfigService, emailTokenRepository: EmailTokenRepository, i18nService: I18nService);
    generateAndSendToken(user: User): Promise<void>;
    verifyToken(token: string): Promise<EmailToken>;
    getVerifiedToken(token: string): Promise<EmailToken>;
    private _verifyTokenPayload;
}
