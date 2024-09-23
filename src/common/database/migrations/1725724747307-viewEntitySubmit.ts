import { MigrationInterface, QueryRunner } from 'typeorm';

export class ViewEntitySubmit1725724747307 implements MigrationInterface {
  name = 'ViewEntitySubmit1725724747307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE VIEW "dbo"."view_submit_text" AS SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."answer_text" AS "answer_text", "submission"."event_guest_id" AS "event_guest_id" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id" WHERE "submission"."question_type" = 4 AND "submission"."id" IS NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "novo_nordisk".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`,
      [
        'novo_nordisk',
        'dbo',
        'VIEW',
        'view_submit_text',
        'SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."answer_text" AS "answer_text", "submission"."event_guest_id" AS "event_guest_id" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id" WHERE "submission"."question_type" = 4 AND "submission"."id" IS NOT NULL',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "dbo"."view_submit_single_choice" AS SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."event_guest_id" AS "event_guest_id", "submission_answer"."answer_id" AS "answer_id", "submission_answer"."answer_content" AS "answer_content", "submission_answer"."answer_text" AS "answer_text" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id"  LEFT JOIN "submission_answer" "submission_answer" ON "submission"."id" = "submission_answer"."submission_id" WHERE "submission"."question_type" = 1 AND "submission"."id" IS NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "novo_nordisk".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`,
      [
        'novo_nordisk',
        'dbo',
        'VIEW',
        'view_submit_single_choice',
        'SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."event_guest_id" AS "event_guest_id", "submission_answer"."answer_id" AS "answer_id", "submission_answer"."answer_content" AS "answer_content", "submission_answer"."answer_text" AS "answer_text" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id"  LEFT JOIN "submission_answer" "submission_answer" ON "submission"."id" = "submission_answer"."submission_id" WHERE "submission"."question_type" = 1 AND "submission"."id" IS NOT NULL',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "dbo"."view_submit_rating" AS SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."answer_value" AS "answer_value", "submission"."event_guest_id" AS "event_guest_id" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id" WHERE "submission"."question_type" = 3 AND "submission"."id" IS NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "novo_nordisk".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`,
      [
        'novo_nordisk',
        'dbo',
        'VIEW',
        'view_submit_rating',
        'SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."answer_value" AS "answer_value", "submission"."event_guest_id" AS "event_guest_id" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id" WHERE "submission"."question_type" = 3 AND "submission"."id" IS NOT NULL',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "dbo"."view_submit_percentage" AS SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."answer_value" AS "answer_value", "submission"."event_guest_id" AS "event_guest_id" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id" WHERE "submission"."question_type" = 5 AND "submission"."id" IS NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "novo_nordisk".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`,
      [
        'novo_nordisk',
        'dbo',
        'VIEW',
        'view_submit_percentage',
        'SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."answer_value" AS "answer_value", "submission"."event_guest_id" AS "event_guest_id" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id" WHERE "submission"."question_type" = 5 AND "submission"."id" IS NOT NULL',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "dbo"."view_submit_multi_choice" AS SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."event_guest_id" AS "event_guest_id", "submission_answer"."answer_id" AS "answer_id", "submission_answer"."answer_content" AS "answer_content", "submission_answer"."answer_text" AS "answer_text" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id"  LEFT JOIN "submission_answer" "submission_answer" ON "submission"."id" = "submission_answer"."submission_id" WHERE "submission"."question_type" = 2 AND "submission"."id" IS NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "novo_nordisk".."typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (@0, @1, DEFAULT, @2, @3, @4)`,
      [
        'novo_nordisk',
        'dbo',
        'VIEW',
        'view_submit_multi_choice',
        'SELECT "form_question"."order" AS "order", "form_question"."form_type" AS "form_type", "form_question"."form_id" AS "form_id", "question"."id" AS "question_id", "submission"."question_content" AS "question_content", "submission"."event_guest_id" AS "event_guest_id", "submission_answer"."answer_id" AS "answer_id", "submission_answer"."answer_content" AS "answer_content", "submission_answer"."answer_text" AS "answer_text" FROM "form_question" "form_question" LEFT JOIN "question" "question" ON "question"."id" = "form_question"."question_id"  LEFT JOIN "submission" "submission" ON "submission"."form_question_id" = "form_question"."id"  LEFT JOIN "submission_answer" "submission_answer" ON "submission"."id" = "submission_answer"."submission_id" WHERE "submission"."question_type" = 2 AND "submission"."id" IS NOT NULL',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "novo_nordisk".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`,
      ['VIEW', 'view_submit_multi_choice', 'novo_nordisk', 'dbo'],
    );
    await queryRunner.query(`DROP VIEW "view_submit_multi_choice"`);
    await queryRunner.query(
      `DELETE FROM "novo_nordisk".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`,
      ['VIEW', 'view_submit_percentage', 'novo_nordisk', 'dbo'],
    );
    await queryRunner.query(`DROP VIEW "view_submit_percentage"`);
    await queryRunner.query(
      `DELETE FROM "novo_nordisk".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`,
      ['VIEW', 'view_submit_rating', 'novo_nordisk', 'dbo'],
    );
    await queryRunner.query(`DROP VIEW "view_submit_rating"`);
    await queryRunner.query(
      `DELETE FROM "novo_nordisk".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`,
      ['VIEW', 'view_submit_single_choice', 'novo_nordisk', 'dbo'],
    );
    await queryRunner.query(`DROP VIEW "view_submit_single_choice"`);
    await queryRunner.query(
      `DELETE FROM "novo_nordisk".."typeorm_metadata" WHERE "type" = @0 AND "name" = @1 AND "database" = @2 AND "schema" = @3`,
      ['VIEW', 'view_submit_text', 'novo_nordisk', 'dbo'],
    );
    await queryRunner.query(`DROP VIEW "view_submit_text"`);
  }
}
