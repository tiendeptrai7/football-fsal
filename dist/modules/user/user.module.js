"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const auth_module_1 = require("../../auth/auth.module");
const role_repository_module_1 = require("../role/repository/role.repository.module");
const system_module_1 = require("../system/system.module");
const zalo_module_1 = require("../zalo/zalo.module");
const common_1 = require("@nestjs/common");
const user_repository_module_1 = require("./repository/user.repository.module");
const user_service_1 = require("./services/user.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            role_repository_module_1.RoleRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            auth_module_1.AuthModule,
            system_module_1.SystemModule,
            zalo_module_1.ZaloModule,
        ],
        exports: [user_service_1.UserService, user_repository_module_1.UserRepositoryModule],
        providers: [user_service_1.UserService],
        controllers: [],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map