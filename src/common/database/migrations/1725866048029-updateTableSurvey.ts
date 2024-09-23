import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableSurvey1725866048029 implements MigrationInterface {
  name = 'UpdateTableSurvey1725866048029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey" ALTER COLUMN "started_at" datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ALTER COLUMN "ended_at" datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey" ALTER COLUMN "ended_at" datetime`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ALTER COLUMN "started_at" datetime`,
    );
  }
}
