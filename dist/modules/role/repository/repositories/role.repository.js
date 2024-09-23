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
exports.RoleRepository = void 0;
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../entities/role.entity");
let RoleRepository = class RoleRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(role_entity_1.Role, dataSource.createEntityManager());
    }
    async getList(params) {
        const query = this.createQueryBuilder('role');
        if (params?.filter) {
            query.andWhere(`(role.name LIKE :filter OR role.slug LIKE :filter)`, {
                filter: `%${params.filter}%`,
            });
        }
        if (!isNaN(params?.status)) {
            query.andWhere('role.status =:status', { status: params.status });
        }
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'role');
        (0, query_helper_1.applyQueryPaging)(params, query);
        return await query.getManyAndCount();
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], RoleRepository);
//# sourceMappingURL=role.repository.js.map