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
exports.ReminderHistoryRepository = void 0;
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const reminder_history_entity_1 = require("../entities/reminder-history.entity");
let ReminderHistoryRepository = class ReminderHistoryRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(reminder_history_entity_1.ReminderHistory, dataSource.createEntityManager());
    }
    async getList(params, user_id) {
        const query = this.createQueryBuilder('reminder_history')
            .leftJoin('reminder_history.event_guest', 'event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user');
        if (user_id) {
            query.where('user.id =:user_id', { user_id });
        }
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'reminder_history');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async userGetById(id, user_id) {
        const query = this.createQueryBuilder('reminder_history')
            .leftJoin('reminder_history.event_guest', 'event_guest')
            .leftJoin('event_guest.event', 'event')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .where('reminder_history.id =:id', { id });
        query.select([
            'reminder_history',
            'event_guest.id',
            'event_guest.event_id',
            'event_guest.qr_status',
            'event_guest.qr_code',
            'event_guest.reply_status',
            'event.name',
            'event.code',
            'event.content',
            'event.location',
            'event.image_url',
            'event.started_at',
            'event.ended_at',
            'event.status',
        ]);
        if (user_id) {
            query.andWhere('user.id =:user_id', { user_id });
        }
        return await query.getOne();
    }
};
exports.ReminderHistoryRepository = ReminderHistoryRepository;
exports.ReminderHistoryRepository = ReminderHistoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ReminderHistoryRepository);
//# sourceMappingURL=reminder-history.repository.js.map