import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableHcoGenderNull1726041661646
  implements MigrationInterface
{
  name = 'AlterTableHcoGenderNull1726041661646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hcp" ALTER COLUMN "gender" tinyint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hcp" ALTER COLUMN "gender" tinyint NOT NULL`,
    );
  }
}
