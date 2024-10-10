import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1728370545048 implements MigrationInterface {
  name = ' $npmConfigName1728370545048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "team_id" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "nationality" character varying NOT NULL, "position" smallint NOT NULL, "birth_date" TIMESTAMP NOT NULL, "status" smallint NOT NULL DEFAULT '0', CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1e467d8359634317ce6264639" ON "player" ("position") `,
    );
    await queryRunner.query(
      `CREATE TABLE "futsal_team" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "thumbnail" character varying, "code" character varying NOT NULL, "content" text NOT NULL, "status" smallint NOT NULL DEFAULT '0', "team_leader_id" integer, "established_year" integer, CONSTRAINT "REL_3e51714f432bb5b97b517d4079" UNIQUE ("team_leader_id"), CONSTRAINT "PK_bdd1c9ef378ab33329c66f7ec31" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7eb5d1a930da470a7a3aa7a56d" ON "futsal_team" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_9deb77a11ad43ce17975f13dc85" FOREIGN KEY ("team_id") REFERENCES "futsal_team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "futsal_team" ADD CONSTRAINT "FK_3e51714f432bb5b97b517d40794" FOREIGN KEY ("team_leader_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "futsal_team" DROP CONSTRAINT "FK_3e51714f432bb5b97b517d40794"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_9deb77a11ad43ce17975f13dc85"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7eb5d1a930da470a7a3aa7a56d"`,
    );
    await queryRunner.query(`DROP TABLE "futsal_team"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e1e467d8359634317ce6264639"`,
    );
    await queryRunner.query(`DROP TABLE "player"`);
  }
}
