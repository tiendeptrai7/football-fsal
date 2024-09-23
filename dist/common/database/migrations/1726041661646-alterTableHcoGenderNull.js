"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableHcoGenderNull1726041661646 = void 0;
class AlterTableHcoGenderNull1726041661646 {
    name = 'AlterTableHcoGenderNull1726041661646';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "hcp" ALTER COLUMN "gender" tinyint`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "hcp" ALTER COLUMN "gender" tinyint NOT NULL`);
    }
}
exports.AlterTableHcoGenderNull1726041661646 = AlterTableHcoGenderNull1726041661646;
//# sourceMappingURL=1726041661646-alterTableHcoGenderNull.js.map