import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableZaloMessage1725937755376 implements MigrationInterface {
  name = 'AlterTableZaloMessage1725937755376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "zalo_message" ADD "comment" nvarchar(1000)`,
    );
    await queryRunner.query(
      `ALTER TABLE "zalo_message" ADD "observe_by" uniqueidentifier`,
    );
    await queryRunner.query(
      `ALTER TABLE "zalo_message" ADD CONSTRAINT "FK_d059d535132db3781a854e53f28" FOREIGN KEY ("observe_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "zalo_message" DROP CONSTRAINT "FK_d059d535132db3781a854e53f28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "zalo_message" DROP COLUMN "observe_by"`,
    );
    await queryRunner.query(`ALTER TABLE "zalo_message" DROP COLUMN "comment"`);
  }
}
