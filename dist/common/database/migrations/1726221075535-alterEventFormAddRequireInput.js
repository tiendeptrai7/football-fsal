"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterEventFormAddRequireInput1726221075535 = void 0;
class AlterEventFormAddRequireInput1726221075535 {
    name = 'AlterEventFormAddRequireInput1726221075535';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_form_option" ADD "require_input" tinyint NOT NULL CONSTRAINT "DF_05b37b136be7ec51f8054c876ed" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "event_form_detail" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "event_form_detail" ADD "content" nvarchar(2000) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_form_detail" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "event_form_detail" ADD "content" nvarchar(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_form_option" DROP CONSTRAINT "DF_05b37b136be7ec51f8054c876ed"`);
        await queryRunner.query(`ALTER TABLE "event_form_option" DROP COLUMN "require_input"`);
    }
}
exports.AlterEventFormAddRequireInput1726221075535 = AlterEventFormAddRequireInput1726221075535;
//# sourceMappingURL=1726221075535-alterEventFormAddRequireInput.js.map