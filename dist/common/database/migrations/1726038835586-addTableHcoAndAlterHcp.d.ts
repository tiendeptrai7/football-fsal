import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddTableHcoAndAlterHcp1726038835586 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
