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
exports.EventRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../entities/event.entity");
let EventRepository = class EventRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(event_entity_1.Event, dataSource.createEntityManager());
    }
    async getList(params, isPublic = false) {
        const query = this.createQueryBuilder('event');
        if (!isPublic) {
            query.leftJoinAndSelect('event.reminders', 'reminders');
        }
        if (params?.filter) {
            query.andWhere("event.name LIKE N'%' + :filter + '%' OR event.code LIKE N'%' + :filter + '%'", {
                filter: params.filter,
            });
        }
        if (isPublic) {
            query.andWhere('event.is_public = :status AND event.status = :status', {
                status: app_enum_1.EStatus.active,
            });
            if (params?.event_status === app_enum_1.EEventStatus.inprogress) {
                query.andWhere('event.started_at <= GETDATE() AND event.ended_at >= GETDATE()');
            }
            if (params?.event_status === app_enum_1.EEventStatus.upcoming) {
                query.andWhere('event.started_at > GETDATE()');
            }
            if (params?.event_status === app_enum_1.EEventStatus.expired) {
                query.andWhere('event.ended_at < GETDATE()');
            }
        }
        if (!isNaN(params?.is_public)) {
            query.andWhere('event.is_public =:is_public', {
                is_public: params.is_public,
            });
        }
        (0, query_helper_1.applyQueryPeriod)(params, query, {
            alias: 'event',
            column: 'started_at',
        });
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'event');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getListEventRelatedHCP(params) {
        const query = this.createQueryBuilder('event')
            .leftJoin('event.event_guest', 'event_guest')
            .select([
            'event.id as id',
            'event.name as name',
            'MIN(event_guest.checked_in_at) as checked_in_at',
        ])
            .groupBy('event.id')
            .addGroupBy('event.name')
            .having('COUNT(event_guest.event_id) > 0');
        if (params?.hcp_id)
            query.andWhere('event_guest.hcp_id = :hcp_id', {
                hcp_id: params.hcp_id,
            });
        return await query.getRawMany();
    }
    async getListReminderHistory(params, user_id) {
        const query = this.createQueryBuilder('event');
        query.leftJoinAndSelect('event.reminders', 'reminders');
        query.leftJoinAndSelect('reminders.reminder_histories', 'reminder_histories');
        query.leftJoin('reminder_histories.event_guest', 'event_guest');
        query.leftJoin('event_guest.hcp', 'hcp');
        query.leftJoin('hcp.user', 'user');
        if (user_id) {
            query.where('user.id =:user_id', { user_id });
            query.andWhere('event.is_public = :status AND event.status = :status', {
                status: app_enum_1.EStatus.active,
            });
        }
        if (params?.filter) {
            query.andWhere("event.name LIKE N'%' + :filter + '%' OR event.code LIKE N'%' + :filter + '%'", {
                filter: params.filter,
            });
        }
        if (!isNaN(params?.status)) {
            query.andWhere('event.status =:status', { status: params.status });
        }
        if (!isNaN(params?.reply_status)) {
            query.andWhere('reminder_histories.reply_status =:status', {
                status: params.reply_status,
            });
        }
        return await query.getManyAndCount();
    }
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], EventRepository);
//# sourceMappingURL=event.repository.js.map