import { DataSource, QueryRunner } from 'typeorm';
export declare function getTransaction(dataSource: DataSource): Promise<QueryRunner>;
