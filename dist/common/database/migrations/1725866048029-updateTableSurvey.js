"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableSurvey1725866048029 = void 0;
class UpdateTableSurvey1725866048029 {
    name = 'UpdateTableSurvey1725866048029';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "started_at" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "ended_at" datetime NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "ended_at" datetime`);
        await queryRunner.query(`ALTER TABLE "survey" ALTER COLUMN "started_at" datetime`);
    }
}
exports.UpdateTableSurvey1725866048029 = UpdateTableSurvey1725866048029;
//# sourceMappingURL=1725866048029-updateTableSurvey.js.map