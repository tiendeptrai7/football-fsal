"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterRef1725937291329 = void 0;
class AfterRef1725937291329 {
    name = 'AfterRef1725937291329';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_registration" DROP CONSTRAINT "FK_aa7a94dfbd22ce39c68a74d8198"`);
        await queryRunner.query(`ALTER TABLE "zalo_message" DROP CONSTRAINT "FK_d059d535132db3781a854e53f28"`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "ref_id"`);
        await queryRunner.query(`ALTER TABLE "event_guest" ADD "ref_id" int`);
        await queryRunner.query(`ALTER TABLE "event_form_option" DROP CONSTRAINT "FK_120b67aa01a8042ac7c5fef8b1d"`);
        await queryRunner.query(`ALTER TABLE "event_form_option" ALTER COLUMN "event_form_detail_id" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_form_option" ADD CONSTRAINT "FK_120b67aa01a8042ac7c5fef8b1d" FOREIGN KEY ("event_form_detail_id") REFERENCES "event_form_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_guest" ADD CONSTRAINT "FK_84001529739b60cd6ed906ace9b" FOREIGN KEY ("ref_id") REFERENCES "event_guest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event_guest" DROP CONSTRAINT "FK_84001529739b60cd6ed906ace9b"`);
        await queryRunner.query(`ALTER TABLE "event_form_option" DROP CONSTRAINT "FK_120b67aa01a8042ac7c5fef8b1d"`);
        await queryRunner.query(`ALTER TABLE "event_form_option" ALTER COLUMN "event_form_detail_id" int`);
        await queryRunner.query(`ALTER TABLE "event_form_option" ADD CONSTRAINT "FK_120b67aa01a8042ac7c5fef8b1d" FOREIGN KEY ("event_form_detail_id") REFERENCES "event_form_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_guest" DROP COLUMN "ref_id"`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "ref_id" int`);
        await queryRunner.query(`ALTER TABLE "zalo_message" ADD CONSTRAINT "FK_d059d535132db3781a854e53f28" FOREIGN KEY ("observe_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD CONSTRAINT "FK_aa7a94dfbd22ce39c68a74d8198" FOREIGN KEY ("ref_id") REFERENCES "event_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AfterRef1725937291329 = AfterRef1725937291329;
//# sourceMappingURL=1725937291329-afterRef.js.map