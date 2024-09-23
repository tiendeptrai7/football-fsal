import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEventFormAddRequireInput1726221075535
  implements MigrationInterface
{
  name = 'AlterEventFormAddRequireInput1726221075535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_form_option" ADD "require_input" smallint NOT NULL CONSTRAINT "DF_05b37b136be7ec51f8054c876ed" DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_detail" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_detail" ADD "content" nvarchar(2000) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_form_detail" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_detail" ADD "content" nvarchar(1000) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_option" DROP CONSTRAINT "DF_05b37b136be7ec51f8054c876ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_option" DROP COLUMN "require_input"`,
    );
  }
}
