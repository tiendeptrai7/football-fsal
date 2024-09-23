"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const permission_repository_module_1 = require("../permission/repository/permission.repository.module");
const common_1 = require("@nestjs/common");
const role_repository_module_1 = require("./repository/role.repository.module");
const role_service_1 = require("./services/role.service");
let RoleModule = class RoleModule {
};
exports.RoleModule = RoleModule;
exports.RoleModule = RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [role_repository_module_1.RoleRepositoryModule, permission_repository_module_1.PermissionRepositoryModule],
        exports: [role_service_1.RoleService],
        providers: [role_service_1.RoleService],
        controllers: [],
    })
], RoleModule);
//# sourceMappingURL=role.module.js.map