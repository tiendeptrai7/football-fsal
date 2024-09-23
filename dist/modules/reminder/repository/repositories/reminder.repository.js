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
exports.ReminderRepository = void 0;
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const date_util_1 = require("../../../../common/utils/date.util");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const reminder_entity_1 = require("../entities/reminder.entity");
let ReminderRepository = class ReminderRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(reminder_entity_1.Reminder, dataSource.createEntityManager());
    }
    async getList(params) {
        const query = this.createQueryBuilder('reminder').leftJoinAndSelect('reminder.event', 'event');
        if (params?.filter) {
            query.andWhere('reminder.name = :filter OR reminder.code = :filter', {
                filter: `%\\${params.filter}%`,
            });
        }
        if (!isNaN(params?.status)) {
            query.andWhere('reminder.status = :status', {
                status: params.status,
            });
        }
        if (params?.reminder_sent_at) {
            const from = (0, date_util_1.startOfDay)(params.reminder_sent_at);
            const to = (0, date_util_1.endOfDay)(params.reminder_sent_at);
            query.andWhere('reminder.reminder_sent_at BETWEEN :from AND :to', {
                from,
                to,
            });
        }
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'reminder');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
};
exports.ReminderRepository = ReminderRepository;
exports.ReminderRepository = ReminderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ReminderRepository);
//# sourceMappingURL=reminder.repository.js.map