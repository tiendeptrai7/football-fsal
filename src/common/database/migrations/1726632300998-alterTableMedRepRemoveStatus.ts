import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableMedRepRemoveStatus1726632300998
  implements MigrationInterface
{
  name = 'AlterTableMedRepRemoveStatus1726632300998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "med_rep" DROP CONSTRAINT "DF_b32289b2f665ffa9019b9dec271"`,
    );
    await queryRunner.query(`ALTER TABLE "med_rep" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "med_rep" ADD CONSTRAINT "UQ_a3ea9c28c6263dd53daf271189c" UNIQUE ("code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "med_rep" DROP CONSTRAINT "UQ_a3ea9c28c6263dd53daf271189c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "med_rep" ADD "status" smallint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "med_rep" ADD CONSTRAINT "DF_b32289b2f665ffa9019b9dec271" DEFAULT 1 FOR "status"`,
    );
  }
}
