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
exports.PermissionRepository = void 0;
const user_role_entity_1 = require("../../../user/repository/entities/user-role.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("../entities/permission.entity");
const permission_role_entity_1 = require("../entities/permission-role.entity");
let PermissionRepository = class PermissionRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(permission_entity_1.Permission, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getAllSlugByUserId(userId) {
        const subQuery = this.dataSource
            .createQueryBuilder(user_role_entity_1.UserRole, 'ur')
            .innerJoinAndMapOne('ur.permission_role', permission_role_entity_1.PermissionRole, 'pr', 'ur.role_id = pr.role_id')
            .where(`ur.user_id = '${userId}'`)
            .select('pr.permission_id');
        const query = this.createQueryBuilder('p').where(`p.id IN(${subQuery.getQuery()})`);
        query.select(['p.slug']);
        return query.getMany();
    }
    async getPermissionByRole(roleId) {
        const result = await this.createQueryBuilder('permission')
            .leftJoin(permission_role_entity_1.PermissionRole, 'pr', 'pr.permission_id = permission.id AND pr.role_id =:roleId', {
            roleId,
        })
            .addSelect('CONVERT(IF(pr.role_id IS NOT NULL, 1, 0), UNSIGNED INTEGER)', 'checked')
            .getRawMany();
        for (const _r of result) {
            _r.checked = !!+_r.checked;
            for (const [key, val] of Object.entries(_r)) {
                const regex = /^permission_/;
                if (regex.test(key)) {
                    _r[key.replace(regex, '')] = val;
                    delete _r[key];
                }
            }
        }
        return result;
    }
};
exports.PermissionRepository = PermissionRepository;
exports.PermissionRepository = PermissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PermissionRepository);
//# sourceMappingURL=permission.repository.js.map