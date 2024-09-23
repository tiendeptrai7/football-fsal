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
exports.FeedbackRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const feedback_entity_1 = require("../entities/feedback.entity");
let FeedbackRepository = class FeedbackRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(feedback_entity_1.Feedback, dataSource.createEntityManager());
    }
    async getList(params) {
        const query = this.createQueryBuilder('feedback').leftJoinAndSelect('feedback.event', 'event');
        if (!isNaN(params?.status)) {
            query.andWhere('feedback.status =:status', { status: params.status });
        }
        if (params?.filter) {
            query.andWhere(`feedback.name LIKE N'%' + :filter + '%' OR feedback.code LIKE N'%' + :filter + '%'`, {
                filter: params.filter,
            });
        }
        (0, query_helper_1.applyQueryPeriod)(params, query, {
            alias: 'feedback',
            column: 'feedback_send_at',
        });
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'feedback');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getByUser(user_id) {
        return await this.createQueryBuilder('feedback')
            .leftJoin('feedback.event', 'event')
            .leftJoin('event.event_guest', 'event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .leftJoin('event_guest.submissions', 'submission')
            .where('user.id =:user_id AND feedback.status =:status', {
            user_id,
            status: app_enum_1.EStatus.active,
        })
            .getMany();
    }
    async getFormQuestion(user_id, id) {
        const query = this.createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.form_questions', 'form_question', 'feedback.id = form_question.form_id')
            .leftJoin('feedback.event', 'event')
            .leftJoin('event.event_guest', 'event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .leftJoin('form_question.question', 'question')
            .leftJoin('form_question.submissions', 'submission', 'submission.event_guest_id = event_guest.id')
            .leftJoin('submission.submission_answers', 'submission_answer')
            .leftJoin('question.answers', 'answer');
        query.where('user.id =:user_id', {
            user_id,
        });
        if (id) {
            query.andWhere('feedback.id = :id AND feedback.status = :status AND form_question.form_type = :type', {
                id,
                status: app_enum_1.EStatus.active,
                type: app_enum_1.EFormType.feedback,
            });
        }
        query.select([
            'feedback.id',
            'feedback.name',
            'feedback.code',
            'feedback.status',
            'feedback.event_id',
            'form_question.id',
            'form_question.form_type',
            'form_question.question_id',
            'question.id',
            'question.content',
            'question.type',
            'question.is_required',
            'answer.id',
            'answer.content',
            'answer.require_input',
            'submission.id',
            'submission.question_type',
            'submission.question_content',
            'submission.answer_value',
            'submission.answer_text',
            'submission_answer.answer_id',
            'submission_answer.answer_content',
            'submission_answer.answer_text',
        ]);
        return await query.getOne();
    }
};
exports.FeedbackRepository = FeedbackRepository;
exports.FeedbackRepository = FeedbackRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FeedbackRepository);
//# sourceMappingURL=feedback.repository.js.map