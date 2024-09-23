import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEventFormAddCode1726212591578 implements MigrationInterface {
  name = 'AlterEventFormAddCode1726212591578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_form" ADD "code" nvarchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form" ADD CONSTRAINT "UQ_d4440b588cd66074b5c7609dfe9" UNIQUE ("code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_form" DROP CONSTRAINT "UQ_d4440b588cd66074b5c7609dfe9"`,
    );
    await queryRunner.query(`ALTER TABLE "event_form" DROP COLUMN "code"`);
  }
}
