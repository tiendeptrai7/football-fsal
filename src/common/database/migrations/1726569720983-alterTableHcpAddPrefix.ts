import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableHcpAddPrefix1726569720983 implements MigrationInterface {
  name = 'AlterTableHcpAddPrefix1726569720983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `EXEC sp_rename "novo_nordisk.dbo.hcp.title", "prefix"`,
    );
    await queryRunner.query(`ALTER TABLE "event_form" ADD "consent" ntext`);
    await queryRunner.query(`ALTER TABLE "event" ADD "publish_at" datetime`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "location"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "location" nvarchar(2000)`,
    );
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "prefix"`);
    await queryRunner.query(`ALTER TABLE "hcp" ADD "prefix" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "prefix"`);
    await queryRunner.query(`ALTER TABLE "hcp" ADD "prefix" nvarchar(255)`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "location"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "location" nvarchar(255)`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "publish_at"`);
    await queryRunner.query(`ALTER TABLE "event_form" DROP COLUMN "consent"`);
    await queryRunner.query(
      `EXEC sp_rename "novo_nordisk.dbo.hcp.prefix", "title"`,
    );
  }
}
