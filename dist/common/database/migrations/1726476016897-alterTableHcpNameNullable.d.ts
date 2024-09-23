import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AlterTableHcpNameNullable1726476016897 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
