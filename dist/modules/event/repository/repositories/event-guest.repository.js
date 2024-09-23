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
exports.EventGuestRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const event_guest_entity_1 = require("../entities/event-guest.entity");
let EventGuestRepository = class EventGuestRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(event_guest_entity_1.EventGuest, dataSource.createEntityManager());
    }
    async getList(params) {
        const query = this.createQueryBuilder('event_guest')
            .leftJoinAndSelect('event_guest.hcp', 'hcp')
            .leftJoinAndSelect('hcp.user', 'user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('hcp.medrep', 'medrep')
            .leftJoinAndSelect('event_guest.ref', 'ref')
            .leftJoinAndSelect('ref.hcp', 'hcpRef');
        if (params?.event_id) {
            query.andWhere('event_guest.event_id =:event_id', {
                event_id: params.event_id,
            });
        }
        if (params?.filter) {
            query.andWhere("(hcp.code LIKE N'%' + :filter + '%' OR event_guest.qr_code LIKE N'%' + :filter + '%' OR hcp.name LIKE N'%' + :filter + '%' OR profile.phone LIKE N'%' + :filter + '%')", {
                filter: params.filter,
            });
        }
        if (params?.med_rep_code) {
            query.andWhere('medrep.code = :medrep_code', {
                medrep_code: params.med_rep_code,
            });
        }
        if (!isNaN(params?.type)) {
            query.andWhere('hcp.type =:type', { type: params.type });
        }
        if (!isNaN(params?.check_in_status)) {
            if (params?.check_in_status) {
                query.andWhere('event_guest.checked_in_at IS NOT NULL');
            }
            else {
                query.andWhere('event_guest.checked_in_at IS NULL');
            }
        }
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'event_guest');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getByUser(user_id) {
        return await this.createQueryBuilder('event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .select(['event_guest', 'user.id', 'user.username'])
            .where('user.id =:user_id', { user_id })
            .getOne();
    }
    async getByForm(form_id, form_type, user_id) {
        const query = this.createQueryBuilder('event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .leftJoin('event_guest.event', 'event')
            .select(['event_guest'])
            .where('user.id =:user_id', { user_id });
        if (form_type == app_enum_1.EFormType.survey) {
            query.leftJoin('event.surveys', 'surveys');
            query.andWhere('surveys.id =:form_id', { form_id });
        }
        if (form_type == app_enum_1.EFormType.feedback) {
            query.leftJoin('event.feedbacks', 'feedbacks');
            query.andWhere('feedbacks.id =:form_id', { form_id });
        }
        return query.getOne();
    }
    async getListParticipantReport(params) {
        const query = this.createQueryBuilder('event_guest')
            .leftJoinAndSelect('event_guest.hcp', 'hcp')
            .leftJoinAndSelect('event_guest.event', 'event')
            .leftJoinAndSelect('event.surveys', 'surveys', 'surveys.id = :survey_id', {
            survey_id: params.survey_id,
        })
            .leftJoinAndSelect('event_guest.submissions', 'submissions')
            .leftJoinAndSelect('submissions.form_question', 'form_question')
            .andWhere('surveys.id IS NOT NULL');
        if (!isNaN(params?.status)) {
            const submissionCondition = params.status === app_enum_1.EStatus.active
                ? 'submissions.id IS NOT NULL'
                : 'submissions.id IS NULL';
            query.andWhere(submissionCondition);
        }
        if (params?.filter) {
            query.andWhere('hcp.name LIKE :filter', { filter: `%${params.filter}%` });
        }
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'event_guest');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getSurveyReportByUser(param, id) {
        const query = this.createQueryBuilder('event_guest')
            .leftJoinAndSelect('event_guest.hcp', 'hcp')
            .leftJoinAndSelect('event_guest.event', 'event')
            .leftJoinAndSelect('event.surveys', 'surveys', 'surveys.id = :survey_id', {
            survey_id: id,
        })
            .leftJoinAndSelect('event_guest.submissions', 'submissions', 'submissions.form_question IS NOT NULL')
            .leftJoinAndSelect('submissions.form_question', 'form_question', 'form_question.form_id = :id', {
            id,
        })
            .leftJoinAndSelect('submissions.submission_answers', 'submission_answers')
            .andWhere('surveys.id IS NOT NULL');
        if (param.event_guest_id) {
            query.andWhere('event_guest.id =:event_guest_id', {
                event_guest_id: param.event_guest_id,
            });
        }
        return await query.getOne();
    }
    async getTicket(codeOrId) {
        const query = this.createQueryBuilder('event_guest')
            .leftJoin('event_guest.event', 'event')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('event_guest.introduced_guests', 'introduced_guests');
        if (!isNaN(+codeOrId)) {
            query.andWhere('event_guest.id =:id', { id: +codeOrId });
        }
        else {
            query.andWhere('event_guest.qr_code = :code', { code: codeOrId });
        }
        query.select([
            'event_guest',
            'event.id',
            'event.name',
            'event.status',
            'hcp',
            'introduced_guests',
        ]);
        return await query.getOne();
    }
};
exports.EventGuestRepository = EventGuestRepository;
exports.EventGuestRepository = EventGuestRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], EventGuestRepository);
//# sourceMappingURL=event-guest.repository.js.map