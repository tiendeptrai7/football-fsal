"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableEventFormRegistrationInfo1726657449333 = void 0;
class AlterTableEventFormRegistrationInfo1726657449333 {
    name = 'AlterTableEventFormRegistrationInfo1726657449333';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP CONSTRAINT "FK_6d69ee0e8634dcb6d893f082dcb"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "event_form_detail_id"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "type" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "format" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "text" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ALTER COLUMN "value" nvarchar(255)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_registration_info" ALTER COLUMN "value" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "format"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD "event_form_detail_id" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_registration_info" ADD CONSTRAINT "FK_6d69ee0e8634dcb6d893f082dcb" FOREIGN KEY ("event_form_detail_id") REFERENCES "event_form_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AlterTableEventFormRegistrationInfo1726657449333 = AlterTableEventFormRegistrationInfo1726657449333;
//# sourceMappingURL=1726657449333-alterTableEventFormRegistrationInfo.js.map