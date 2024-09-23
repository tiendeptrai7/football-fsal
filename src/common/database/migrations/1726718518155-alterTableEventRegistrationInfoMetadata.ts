import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableEventRegistrationInfoMetadata1726718518155
  implements MigrationInterface
{
  name = 'AlterTableEventRegistrationInfoMetadata1726718518155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP CONSTRAINT "FK_9f9d4666ec07c4ae75145a8c327"`,
    );
    await queryRunner.query(
      `EXEC sp_rename "novo_nordisk.dbo.event_registration_option.event_form_option_id", "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP COLUMN "type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP COLUMN "format"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP COLUMN "text"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD "metadata" ntext`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ALTER COLUMN "value" nvarchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD "metadata" ntext`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD "metadata" int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ALTER COLUMN "value" nvarchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD "text" nvarchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD "format" nvarchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD "type" nvarchar(255)`,
    );
    await queryRunner.query(
      `EXEC sp_rename "novo_nordisk.dbo.event_registration_option.metadata", "event_form_option_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD CONSTRAINT "FK_9f9d4666ec07c4ae75145a8c327" FOREIGN KEY ("event_form_option_id") REFERENCES "event_form_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
