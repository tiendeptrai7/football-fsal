import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AlterTableHcpAddPrefix1726569720983 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
