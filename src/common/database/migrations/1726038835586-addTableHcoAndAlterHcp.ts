import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableHcoAndAlterHcp1726038835586 implements MigrationInterface {
  name = 'AddTableHcoAndAlterHcp1726038835586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hco" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_fa21c5ee4877a4c6bfe90f8d040" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_465d7e4ce4cc905b2829284b7e0" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "code" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "status" smallint NOT NULL, CONSTRAINT "UQ_cdc22a91d92510b0b07c79543c5" UNIQUE ("code"), CONSTRAINT "PK_42a68a4b47f8cc2e33adca75b98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "hco"`);
    await queryRunner.query(
      `ALTER TABLE "hcp" DROP CONSTRAINT "DF_f725c5e67419636a500411a2ae0"`,
    );
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "hcp" ADD "dob" datetime`);
    await queryRunner.query(`ALTER TABLE "hcp" ADD "title" nvarchar(255)`);
    await queryRunner.query(`ALTER TABLE "hcp" ADD "hco_id" int`);
    await queryRunner.query(
      `ALTER TABLE "hcp" DROP CONSTRAINT "DF_49253f72e08b5482f668cfdaf71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hcp" ADD CONSTRAINT "FK_50a0ce4941bbabf7a25deccb163" FOREIGN KEY ("hco_id") REFERENCES "hco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hcp" DROP CONSTRAINT "FK_50a0ce4941bbabf7a25deccb163"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hcp" ADD CONSTRAINT "DF_49253f72e08b5482f668cfdaf71" DEFAULT 2 FOR "gender"`,
    );
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "hco_id"`);
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "dob"`);
    await queryRunner.query(`ALTER TABLE "hcp" ADD "status" smallint NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "hcp" ADD CONSTRAINT "DF_f725c5e67419636a500411a2ae0" DEFAULT 1 FOR "status"`,
    );
    await queryRunner.query(`ALTER TABLE "hcp" ADD "hco" nvarchar(255)`);
    await queryRunner.query(`DROP TABLE "hco"`);
  }
}
