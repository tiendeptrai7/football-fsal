"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableMedRepRemoveStatus1726632300998 = void 0;
class AlterTableMedRepRemoveStatus1726632300998 {
    name = 'AlterTableMedRepRemoveStatus1726632300998';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "med_rep" DROP CONSTRAINT "DF_b32289b2f665ffa9019b9dec271"`);
        await queryRunner.query(`ALTER TABLE "med_rep" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "med_rep" ADD CONSTRAINT "UQ_a3ea9c28c6263dd53daf271189c" UNIQUE ("code")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "med_rep" DROP CONSTRAINT "UQ_a3ea9c28c6263dd53daf271189c"`);
        await queryRunner.query(`ALTER TABLE "med_rep" ADD "status" tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "med_rep" ADD CONSTRAINT "DF_b32289b2f665ffa9019b9dec271" DEFAULT 1 FOR "status"`);
    }
}
exports.AlterTableMedRepRemoveStatus1726632300998 = AlterTableMedRepRemoveStatus1726632300998;
//# sourceMappingURL=1726632300998-alterTableMedRepRemoveStatus.js.map