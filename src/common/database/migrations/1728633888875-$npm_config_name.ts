import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1728633888875 implements MigrationInterface {
  name = ' $npmConfigName1728633888875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "user_id" uuid, "field_id" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "field_image" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "image_url" character varying(255) NOT NULL, "field_id" integer, CONSTRAINT "PK_44b59c083726cd35d51fb43d574" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "time_slot" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "field_id" integer, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "field" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "capacity" integer NOT NULL, "price_per_hour" numeric(10,2) NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_39379bba786d7a75226b358f81e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL, "payment_method" character varying(50) NOT NULL, "status" character varying(50) NOT NULL, "payment_date" TIMESTAMP NOT NULL DEFAULT now(), "booking_id" integer, CONSTRAINT "REL_cee78453638dfaf440f1aa63c2" UNIQUE ("booking_id"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "total_price" numeric(10,2) NOT NULL, "status" character varying(50) NOT NULL, "user_id" uuid, "field_id" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_2500d99abcbaffbf6bab38f7879" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_image" ADD CONSTRAINT "FK_ba1fa76f599264f64373b79cd21" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_slot" ADD CONSTRAINT "FK_bd0699e2adac48c8b3a09d18f97" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_cee78453638dfaf440f1aa63c26" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_3332ea09557d88e289953278875" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_3332ea09557d88e289953278875"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_cee78453638dfaf440f1aa63c26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "time_slot" DROP CONSTRAINT "FK_bd0699e2adac48c8b3a09d18f97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_image" DROP CONSTRAINT "FK_ba1fa76f599264f64373b79cd21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_2500d99abcbaffbf6bab38f7879"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`,
    );
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "field"`);
    await queryRunner.query(`DROP TABLE "time_slot"`);
    await queryRunner.query(`DROP TABLE "field_image"`);
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
