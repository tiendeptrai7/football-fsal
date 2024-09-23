"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableHcpAddPrefix1726569720983 = void 0;
class AlterTableHcpAddPrefix1726569720983 {
    name = 'AlterTableHcpAddPrefix1726569720983';
    async up(queryRunner) {
        await queryRunner.query(`EXEC sp_rename "novo_nordisk.dbo.hcp.title", "prefix"`);
        await queryRunner.query(`ALTER TABLE "event_form" ADD "consent" ntext`);
        await queryRunner.query(`ALTER TABLE "event" ADD "publish_at" datetime`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "location" nvarchar(2000)`);
        await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "prefix"`);
        await queryRunner.query(`ALTER TABLE "hcp" ADD "prefix" nvarchar(255)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "hcp" DROP COLUMN "prefix"`);
        await queryRunner.query(`ALTER TABLE "hcp" ADD "prefix" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "location" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "publish_at"`);
        await queryRunner.query(`ALTER TABLE "event_form" DROP COLUMN "consent"`);
        await queryRunner.query(`EXEC sp_rename "novo_nordisk.dbo.hcp.prefix", "title"`);
    }
}
exports.AlterTableHcpAddPrefix1726569720983 = AlterTableHcpAddPrefix1726569720983;
//# sourceMappingURL=1726569720983-alterTableHcpAddPrefix.js.map