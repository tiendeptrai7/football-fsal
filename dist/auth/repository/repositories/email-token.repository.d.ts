import { DataSource, Repository } from 'typeorm';
import { EmailToken } from '../entities/email-token.entity';
export declare class EmailTokenRepository extends Repository<EmailToken> {
    constructor(dataSource: DataSource);
}
