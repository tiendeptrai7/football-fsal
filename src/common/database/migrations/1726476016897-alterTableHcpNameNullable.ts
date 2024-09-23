import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableHcpNameNullable1726476016897
  implements MigrationInterface
{
  name = 'AlterTableHcpNameNullable1726476016897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hcp" ALTER COLUMN "name" nvarchar(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hcp" ALTER COLUMN "name" nvarchar(255) NOT NULL`,
    );
  }
}
