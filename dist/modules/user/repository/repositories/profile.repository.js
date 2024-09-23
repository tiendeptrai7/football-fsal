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
exports.ProfileRepository = void 0;
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const profile_entity_1 = require("../entities/profile.entity");
let ProfileRepository = class ProfileRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(profile_entity_1.Profile, dataSource.createEntityManager());
    }
    async getZaloUserById(id) {
        const query = this.createQueryBuilder('profile')
            .leftJoinAndSelect('profile.user', 'user')
            .leftJoinAndSelect('user.hcp', 'hcp')
            .leftJoinAndSelect('user.med_rep', 'med_rep')
            .leftJoinAndSelect('hcp.hco', 'hco')
            .where('profile.user_id = :id AND profile.zalo_id IS NOT NULL', { id });
        return query.getOne();
    }
    async getListZaloUser(params) {
        const { filter } = params;
        const query = this.createQueryBuilder('profile')
            .leftJoinAndSelect('profile.user', 'user')
            .leftJoinAndSelect('user.hcp', 'hcp')
            .leftJoinAndSelect('user.med_rep', 'med_rep')
            .leftJoinAndSelect('hcp.hco', 'hco')
            .where('profile.zalo_id IS NOT NULL');
        if (filter) {
            query.andWhere(`(
            profile.zalo_id LIKE :filter OR 
            hcp.phone LIKE :filter
          )`, { filter: `%${params.filter}%` });
        }
        (0, query_helper_1.applyQueryPaging)(params, query);
        (0, query_helper_1.applyQuerySorting)(params.sorting, query, 'profile');
        return query.getManyAndCount();
    }
};
exports.ProfileRepository = ProfileRepository;
exports.ProfileRepository = ProfileRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProfileRepository);
//# sourceMappingURL=profile.repository.js.map