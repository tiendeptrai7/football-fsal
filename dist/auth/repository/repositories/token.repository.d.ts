import { DataSource, Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
export declare class TokenRepository extends Repository<Token> {
    constructor(dataSource: DataSource);
}
