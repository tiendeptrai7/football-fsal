"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableEventRegistrationInfoMetadata1726718518155 = void 0;
class AlterTableEventRegistrationInfoMetadata1726718518155 {
    name = 'AlterTableEventRegistrationInfoMetadata1726718518155';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_registration_option" DROP CONSTRAINT "FK_9f9d4666ec07c4ae75145a8c327"`);
        await queryRunner.query(`EXEC sp_rename "novo_nordisk.dbo.event_registration_option.event_form_option_id", "metadata"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "format"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "metadata" ntext`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ALTER COLUMN "value" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_registration_option" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "event_registration_option" ADD "metadata" ntext`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_registration_option" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "event_registration_option" ADD "metadata" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ALTER COLUMN "value" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "text" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "format" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "type" nvarchar(255)`);
        await queryRunner.query(`EXEC sp_rename "novo_nordisk.dbo.event_registration_option.metadata", "event_form_option_id"`);
        await queryRunner.query(`ALTER TABLE "event_registration_option" ADD CONSTRAINT "FK_9f9d4666ec07c4ae75145a8c327" FOREIGN KEY ("event_form_option_id") REFERENCES "event_form_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AlterTableEventRegistrationInfoMetadata1726718518155 = AlterTableEventRegistrationInfoMetadata1726718518155;
//# sourceMappingURL=1726718518155-alterTableEventRegistrationInfoMetadata.js.map