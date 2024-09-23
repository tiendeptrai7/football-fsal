import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tmp1726028130305 implements MigrationInterface {
  name = 'Tmp1726028130305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP CONSTRAINT "FK_7acb953aece9690b4483295ba39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP CONSTRAINT "FK_a9bacae177de99350d91bc1359d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTAL_NN_MEDREP" ALTER COLUMN "medrep_ioengage_id" nvarchar(18) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTAL_NN_MEDREP" ADD CONSTRAINT "PK_5c46b24d481430908573608ead8" PRIMARY KEY ("medrep_ioengage_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCP" ALTER COLUMN "hcp_id" nvarchar(18) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCP" ADD CONSTRAINT "PK_6bfafb78001498d2f261350c3f9" PRIMARY KEY ("hcp_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCO" ALTER COLUMN "hco_id" nvarchar(18) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCO" ADD CONSTRAINT "PK_0bc0e8364f810e6c407fd22e4de" PRIMARY KEY ("hco_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD CONSTRAINT "FK_7acb953aece9690b4483295ba39" FOREIGN KEY ("event_registration_id") REFERENCES "event_registration"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD CONSTRAINT "FK_a9bacae177de99350d91bc1359d" FOREIGN KEY ("event_registration_info_id") REFERENCES "event_registration_info"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP CONSTRAINT "FK_a9bacae177de99350d91bc1359d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP CONSTRAINT "FK_7acb953aece9690b4483295ba39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCO" DROP CONSTRAINT "PK_0bc0e8364f810e6c407fd22e4de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCO" ALTER COLUMN "hco_id" nvarchar(18)`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCP" DROP CONSTRAINT "PK_6bfafb78001498d2f261350c3f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTUAL_NN_HCP" ALTER COLUMN "hcp_id" nvarchar(18)`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTAL_NN_MEDREP" DROP CONSTRAINT "PK_5c46b24d481430908573608ead8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guest"."FRACTAL_NN_MEDREP" ALTER COLUMN "medrep_ioengage_id" nvarchar(18)`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD CONSTRAINT "FK_a9bacae177de99350d91bc1359d" FOREIGN KEY ("event_registration_info_id") REFERENCES "event_registration_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD CONSTRAINT "FK_7acb953aece9690b4483295ba39" FOREIGN KEY ("event_registration_id") REFERENCES "event_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
