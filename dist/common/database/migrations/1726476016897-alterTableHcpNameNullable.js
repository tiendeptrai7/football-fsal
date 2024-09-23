"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableHcpNameNullable1726476016897 = void 0;
class AlterTableHcpNameNullable1726476016897 {
    name = 'AlterTableHcpNameNullable1726476016897';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "hcp" ALTER COLUMN "name" nvarchar(255)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "hcp" ALTER COLUMN "name" nvarchar(255) NOT NULL`);
    }
}
exports.AlterTableHcpNameNullable1726476016897 = AlterTableHcpNameNullable1726476016897;
//# sourceMappingURL=1726476016897-alterTableHcpNameNullable.js.map