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
exports.UserRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const query_helper_1 = require("../../../../common/database/helper/query.helper");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
    }
    async getUserByCredential(credential, column, withPassword = false, status = app_enum_1.EStatus.active) {
        const condition = {};
        condition[column] = credential;
        const query = this.createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('user.user_roles', 'ur')
            .leftJoinAndSelect('ur.role', 'r')
            .where(`user.${column} = :value AND user.status = :status AND r.status = :status`, {
            value: credential,
            status,
        })
            .withDeleted();
        if (withPassword) {
            query.addSelect('user.password');
        }
        return query.getOne();
    }
    async getUserWithProfile(criteria, column) {
        const condition = {};
        condition[column] = criteria;
        return this.findOne({
            where: condition,
            relations: ['profile', 'user_roles', 'user_roles.role', 'hcp', 'med_rep'],
        });
    }
    async getList(params, isExport = false) {
        const query = this.createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('user.user_roles', 'user_roles')
            .innerJoinAndSelect('user_roles.role', 'role', 'role.slug NOT IN(:...roleUser) ', { roleUser: ['user_standard'] });
        this._applyQueryBase(params, query);
        (0, query_helper_1.applyQueryPaging)(params, query, isExport);
        if (isExport) {
            query.select([
                'user',
                'profile.full_name',
                'profile.code',
                'profile.phone',
                'user_roles.id',
                'role.slug',
                'role.name',
            ]);
            return [await query.getRawMany(), 0];
        }
        else {
            return await query.getManyAndCount();
        }
    }
    _applyQueryBase(params, query) {
        const { filter, status, roles, sorting } = params;
        if (filter) {
            query.andWhere(`(
            user.email LIKE :filter OR 
            user.username LIKE :filter OR 
            profile.full_name LIKE :filter OR 
            profile.zalo_follow_oa_id LIKE :filter OR 
            profile.phone LIKE :filter
          )`, { filter: `%${params.filter}%` });
        }
        if (!isNaN(status)) {
            query.andWhere('user.status = :status', { status: +status });
        }
        if (roles?.length) {
            query.andWhere('role.slug IN(:...roles)', { roles });
        }
        if (sorting) {
            const sort = (0, query_helper_1.extractSorting)(sorting);
            (0, query_helper_1.applyQuerySorting)(sorting, query, sort.key?.includes('.') ? null : 'user');
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map