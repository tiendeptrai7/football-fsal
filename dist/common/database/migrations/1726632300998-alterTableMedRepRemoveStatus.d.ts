import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AlterTableMedRepRemoveStatus1726632300998 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
