"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterEventFormAddCode1726212591578 = void 0;
class AlterEventFormAddCode1726212591578 {
    name = 'AlterEventFormAddCode1726212591578';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_form" ADD "code" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_form" ADD CONSTRAINT "UQ_d4440b588cd66074b5c7609dfe9" UNIQUE ("code")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_form" DROP CONSTRAINT "UQ_d4440b588cd66074b5c7609dfe9"`);
        await queryRunner.query(`ALTER TABLE "event_form" DROP COLUMN "code"`);
    }
}
exports.AlterEventFormAddCode1726212591578 = AlterEventFormAddCode1726212591578;
//# sourceMappingURL=1726212591578-alterEventFormAddCode.js.map