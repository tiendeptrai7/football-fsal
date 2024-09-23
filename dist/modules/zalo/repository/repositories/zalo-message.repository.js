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
exports.ZaloMessageRepository = void 0;
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const zalo_message_entity_1 = require("../entities/zalo-message.entity");
let ZaloMessageRepository = class ZaloMessageRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(zalo_message_entity_1.ZaloMessage, dataSource.createEntityManager());
    }
    async getZaloOAMessages(params, isExport = false) {
        const query = this.createQueryBuilder('zalo_message')
            .leftJoinAndSelect('zalo_message.observer', 'observer')
            .leftJoinAndSelect('observer.profile', 'profile');
        if (params.filter)
            query.andWhere(`zalo_message.from_display_name LIKE N'%' + :filter + '%' OR zalo_message.to_display_name LIKE N'%' + :filter`, {
                filter: params.filter,
            });
        if (!isNaN(params?.activities))
            if (params.activities)
                query.andWhere('zalo_message.from_id IS NULL');
            else
                query.andWhere('zalo_message.from_id IS NOT NULL');
        if (params.observe_by)
            query.andWhere('zalo_message.observe_by = :observe_by', {
                observe_by: params.observe_by,
            });
        if (params.message_type)
            query.andWhere('zalo_message.event_name LIKE :message_type', {
                message_type: `%${params.message_type}`,
            });
        (0, query_helper_1.applyQueryPeriod)(params, query, {
            alias: 'zalo_message',
            column: 'timestamp',
        });
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'zalo_message');
        (0, query_helper_1.applyQueryPaging)(params, query, isExport);
        return await query.getManyAndCount();
    }
    async getObserverList() {
        const observers = await this.createQueryBuilder('zalo_message')
            .leftJoin('zalo_message.observer', 'observer')
            .leftJoin('observer.profile', 'profile')
            .where('zalo_message.observe_by IS NOT NULL')
            .select([
            'zalo_message.observe_by AS observe_by',
            'MAX(observer.id) AS observer_id',
            'MAX(profile.full_name) AS full_name',
        ])
            .groupBy('zalo_message.observe_by')
            .getRawMany();
        return observers.map((observer) => ({
            observer_id: observer.observe_by,
            observer_name: observer.full_name,
        }));
    }
};
exports.ZaloMessageRepository = ZaloMessageRepository;
exports.ZaloMessageRepository = ZaloMessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ZaloMessageRepository);
//# sourceMappingURL=zalo-message.repository.js.map