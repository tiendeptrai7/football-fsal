"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const submission_entity_1 = require("../entities/submission.entity");
let SubmissionRepository = class SubmissionRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(submission_entity_1.Submission, dataSource.createEntityManager());
    }
    async getByUser(user_id, type, form_id) {
        const query = this.createQueryBuilder('submission')
            .leftJoin('submission.event_guest', 'event_guest')
            .leftJoinAndSelect('submission.form_question', 'form_question')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user');
        query.where('user.id =:user_id AND form_question.form_type =:type', {
            user_id,
            type,
        });
        if (form_id) {
            query.andWhere('form_question.form_id =:form_id', { form_id });
        }
        return await query.getMany();
    }
    async getByEventGuest(event_guest_id, type, form_id) {
        const query = this.createQueryBuilder('submission')
            .leftJoin('submission.event_guest', 'event_guest')
            .leftJoin('submission.form_question', 'form_question');
        query.where('event_guest.id =:event_guest_id', {
            event_guest_id,
        });
        if (type) {
            query.andWhere('form_question.form_type =:type', { type });
        }
        if (form_id) {
            query.andWhere('form_question.form_id =:form_id', { form_id });
        }
        query.select(['submission.id', 'submission.form_question']);
        return await query.getMany();
    }
};
exports.SubmissionRepository = SubmissionRepository;
exports.SubmissionRepository = SubmissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SubmissionRepository);
//# sourceMappingURL=submission.repository.js.map