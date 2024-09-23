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
exports.SystemRepository = void 0;
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const system_entity_1 = require("../entities/system.entity");
let SystemRepository = class SystemRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(system_entity_1.System, dataSource.createEntityManager());
    }
    async getList(params) {
        const { filter, sorting, group, status, is_public } = params;
        const query = this.createQueryBuilder('system');
        if (params?.filter) {
            query.where('(system.name LIKE :filter OR system.key LIKE :filter)', {
                filter: `%\\${filter}%`,
            });
        }
        if (group) {
            query.andWhere('system.group =:group', { group });
        }
        if (!isNaN(status)) {
            query.andWhere('system.status = :status', { status });
        }
        if (!isNaN(is_public)) {
            query.andWhere('system.is_public = :is_public', { is_public });
        }
        (0, query_helper_1.applyQuerySorting)(sorting, query, 'system');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
    async getValueByKey(key) {
        const system = await this.findOneBy({ key });
        return system?.value[0];
    }
};
exports.SystemRepository = SystemRepository;
exports.SystemRepository = SystemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SystemRepository);
//# sourceMappingURL=system.repository.js.map