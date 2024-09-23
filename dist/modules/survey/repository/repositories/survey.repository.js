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
exports.SurveyRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const survey_entity_1 = require("../entities/survey.entity");
let SurveyRepository = class SurveyRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(survey_entity_1.Survey, dataSource.createEntityManager());
    }
    async getList(params) {
        const query = this.createQueryBuilder('survey');
        query.leftJoin('survey.event', 'event');
        if (!isNaN(params?.status)) {
            query.andWhere('survey.status =:status', { status: params.status });
        }
        if (params?.filter) {
            query.andWhere(`survey.name LIKE N'%' + :filter + '%' OR survey.code LIKE N'%' + :filter + '%'`, {
                filter: params.filter,
            });
        }
        query.select(['survey', 'event.name', 'event.id']);
        (0, query_helper_1.applyQueryPeriod)(params, query, {
            alias: 'survey',
            column: 'created_at',
        });
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'survey');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getListReport(params) {
        const query = this.createQueryBuilder('survey');
        query.leftJoin('survey.event', 'event');
        query.leftJoin('event.event_guest', 'event_guest');
        if (!isNaN(params?.status)) {
            query.andWhere('survey.status =:status', { status: params.status });
        }
        if (params?.filter) {
            query.andWhere(`survey.name LIKE N'%' + :filter + '%' OR survey.code LIKE N'%' + :filter`, {
                filter: params.filter,
            });
        }
        query.select(['survey', 'event.name', 'event.id', 'event_guest.id']);
        (0, query_helper_1.applyQueryPeriod)(params, query, {
            alias: 'survey',
            column: 'created_at',
        });
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'survey');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getOverviewReport(id) {
        const query = this.createQueryBuilder('survey');
        query.leftJoinAndSelect('survey.event', 'event');
        query.leftJoinAndSelect('event.event_guest', 'event_guest');
        query.leftJoinAndSelect('event_guest.submissions', 'submissions');
        query.leftJoinAndSelect('submissions.form_question', 'form_question');
        query.where('survey.id = :id', { id });
        return await query.getOne();
    }
    async getDetailReport(id) {
        const query = this.createQueryBuilder('survey');
        query.leftJoinAndSelect('survey.form_questions', 'form_question', 'survey.id = form_question.form_id');
        query.leftJoinAndSelect('form_question.question', 'question');
        query.where('survey.id = :id', { id });
        return await query.getOne();
    }
    async getByUser(user_id) {
        return await this.createQueryBuilder('survey')
            .leftJoin('survey.event', 'event')
            .leftJoin('event.event_guest', 'event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .leftJoin('event_guest.submissions', 'submission')
            .where('user.id =:user_id', { user_id })
            .andWhere('survey.started_at <= GETDATE() AND survey.ended_at >= GETDATE()')
            .getMany();
    }
    async getFormQuestion(user_id, id) {
        const query = this.createQueryBuilder('survey')
            .leftJoinAndSelect('survey.form_questions', 'form_question', 'survey.id = form_question.form_id')
            .leftJoin('survey.event', 'event')
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
            query.where('survey.id = :id AND form_question.form_type = :type', {
                id,
                type: app_enum_1.EFormType.survey,
            });
        }
        query.select([
            'survey.id',
            'survey.name',
            'survey.code',
            'survey.status',
            'survey.event_id',
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
    async getById(id) {
        const query = this.createQueryBuilder('survey')
            .leftJoin('survey.form_questions', 'form_question', 'survey.id = form_question.form_id')
            .leftJoin('form_question.question', 'question')
            .leftJoin('question.answers', 'answer')
            .where('survey.id = :id', {
            id,
            type: app_enum_1.EFormType.survey,
        });
        query.select([
            'survey.name',
            'survey.status',
            'survey.event_id',
            'survey.started_at',
            'survey.ended_at',
            'form_question.form_type',
            'form_question.question_id',
        ]);
        return await query.getOne();
    }
};
exports.SurveyRepository = SurveyRepository;
exports.SurveyRepository = SurveyRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SurveyRepository);
//# sourceMappingURL=survey.repository.js.map