"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableZaloMessage1725937755376 = void 0;
class AlterTableZaloMessage1725937755376 {
    name = 'AlterTableZaloMessage1725937755376';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "zalo_message" ADD "comment" nvarchar(1000)`);
        await queryRunner.query(`ALTER TABLE "zalo_message" ADD "observe_by" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "zalo_message" ADD CONSTRAINT "FK_d059d535132db3781a854e53f28" FOREIGN KEY ("observe_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "zalo_message" DROP CONSTRAINT "FK_d059d535132db3781a854e53f28"`);
        await queryRunner.query(`ALTER TABLE "zalo_message" DROP COLUMN "observe_by"`);
        await queryRunner.query(`ALTER TABLE "zalo_message" DROP COLUMN "comment"`);
    }
}
exports.AlterTableZaloMessage1725937755376 = AlterTableZaloMessage1725937755376;
//# sourceMappingURL=1725937755376-alterTableZaloMessage.js.map