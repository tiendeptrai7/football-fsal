import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableEventForm1725867470486 implements MigrationInterface {
  name = 'AddTableEventForm1725867470486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_registration" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_494c219c4bddabcaaf80fa32527" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_9b680bceb1dad716273ce357504" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "event_guest_id" int, "consented_at" datetime, "ref_id" int, CONSTRAINT "PK_10aedff1bd0d0ef534d1106ddec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_88316f0caeeedd542f004d9a9c" ON "event_registration" ("event_guest_id") WHERE "event_guest_id" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_registration_info" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_3f95e50005597338a9382691e94" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_dcd1a345375765213ec5e71dd51" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "event_registration_id" int NOT NULL, "event_form_detail_id" int NOT NULL, "value" nvarchar(255) NOT NULL, "content" nvarchar(255), CONSTRAINT "PK_ef3c067e3a552547766d0808990" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_registration_option" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_bdd8b910ce6cffd03fa1b7c4306" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_90a2f5f48bef3702178cfd1e99a" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "event_registration_info_id" int NOT NULL, "event_form_option_id" int NOT NULL, "value" nvarchar(255) NOT NULL, "content" nvarchar(255), CONSTRAINT "PK_ea942714e1799caf0eda3a30f5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_form_option" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_8270ae822cbaad5b76ea931a735" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_bfbb937fda70286dd1960842d4e" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "content" nvarchar(1000) NOT NULL, "event_form_detail_id" int, CONSTRAINT "PK_6ba06dbee906fa66e9af2487870" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_form_detail" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_53e8742de4e9002bceb82a335ff" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6f3e61c3ad78847439079e922f5" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "content" nvarchar(1000) NOT NULL, "type" nvarchar(255) NOT NULL, "format" nvarchar(255) NOT NULL, "is_required" smallint NOT NULL CONSTRAINT "DF_ee9bcf29b70139151603051399d" DEFAULT 1, "event_form_id" int, CONSTRAINT "PK_31b062603e26c6d526a404eb9d8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_form" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_24923a205ff147e16167003da84" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_ddbe4bc2345647dfe8dfd2aaa1f" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "status" smallint NOT NULL CONSTRAINT "DF_b562c533e6c312ed9e3823de90d" DEFAULT 1, CONSTRAINT "PK_cbc36b42e70b39e331d1b09d262" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hcp_update_history" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_91b45797b99d3d0db97d5373dcd" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_9f319a0c7fd6e3b6f93faf40684" DEFAULT getdate(), "id" int NOT NULL IDENTITY(1,1), "hcp_id" int NOT NULL, "old_value" ntext NOT NULL, "new_value" ntext NOT NULL, "type" int NOT NULL, CONSTRAINT "PK_8a128f54a2c8295cc6a4a018e16" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "event" ADD "event_form_id" int`);
    await queryRunner.query(
      `ALTER TABLE "event_registration" ADD CONSTRAINT "FK_88316f0caeeedd542f004d9a9c4" FOREIGN KEY ("event_guest_id") REFERENCES "event_guest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration" ADD CONSTRAINT "FK_aa7a94dfbd22ce39c68a74d8198" FOREIGN KEY ("ref_id") REFERENCES "event_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD CONSTRAINT "FK_7acb953aece9690b4483295ba39" FOREIGN KEY ("event_registration_id") REFERENCES "event_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" ADD CONSTRAINT "FK_6d69ee0e8634dcb6d893f082dcb" FOREIGN KEY ("event_form_detail_id") REFERENCES "event_form_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD CONSTRAINT "FK_a9bacae177de99350d91bc1359d" FOREIGN KEY ("event_registration_info_id") REFERENCES "event_registration_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" ADD CONSTRAINT "FK_9f9d4666ec07c4ae75145a8c327" FOREIGN KEY ("event_form_option_id") REFERENCES "event_form_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_option" ADD CONSTRAINT "FK_120b67aa01a8042ac7c5fef8b1d" FOREIGN KEY ("event_form_detail_id") REFERENCES "event_form_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_detail" ADD CONSTRAINT "FK_0efd75dac8fc3a1de274cd6b366" FOREIGN KEY ("event_form_id") REFERENCES "event_form"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_303ba13f0cb3c979251f676ae9e" FOREIGN KEY ("event_form_id") REFERENCES "event_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hcp_update_history" ADD CONSTRAINT "FK_172441cb02ddb657647f6bdbc23" FOREIGN KEY ("hcp_id") REFERENCES "hcp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hcp_update_history" DROP CONSTRAINT "FK_172441cb02ddb657647f6bdbc23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_303ba13f0cb3c979251f676ae9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_detail" DROP CONSTRAINT "FK_0efd75dac8fc3a1de274cd6b366"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_form_option" DROP CONSTRAINT "FK_120b67aa01a8042ac7c5fef8b1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP CONSTRAINT "FK_9f9d4666ec07c4ae75145a8c327"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_option" DROP CONSTRAINT "FK_a9bacae177de99350d91bc1359d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP CONSTRAINT "FK_6d69ee0e8634dcb6d893f082dcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration_info" DROP CONSTRAINT "FK_7acb953aece9690b4483295ba39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration" DROP CONSTRAINT "FK_aa7a94dfbd22ce39c68a74d8198"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_registration" DROP CONSTRAINT "FK_88316f0caeeedd542f004d9a9c4"`,
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "event_form_id"`);
    await queryRunner.query(`DROP TABLE "hcp_update_history"`);
    await queryRunner.query(`DROP TABLE "event_form"`);
    await queryRunner.query(`DROP TABLE "event_form_detail"`);
    await queryRunner.query(`DROP TABLE "event_form_option"`);
    await queryRunner.query(`DROP TABLE "event_registration_option"`);
    await queryRunner.query(`DROP TABLE "event_registration_info"`);
    await queryRunner.query(
      `DROP INDEX "REL_88316f0caeeedd542f004d9a9c" ON "event_registration"`,
    );
    await queryRunner.query(`DROP TABLE "event_registration"`);
  }
}
