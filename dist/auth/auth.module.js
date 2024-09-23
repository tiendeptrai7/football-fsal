"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const auth_password_service_1 = require("./services/auth.password.service");
const mail_module_1 = require("../common/mail/mail.module");
const permission_repository_module_1 = require("../modules/permission/repository/permission.repository.module");
const role_repository_module_1 = require("../modules/role/repository/role.repository.module");
const user_repository_module_1 = require("../modules/user/repository/user.repository.module");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./controllers/auth.controller");
const token_repository_module_1 = require("./repository/token.repository.module");
const auth_email_token_service_1 = require("./services/auth.email-token.service");
const auth_service_1 = require("./services/auth.service");
const auth_zalo_service_1 = require("./services/auth.zalo.service");
const auth_jwt_access_strategy_1 = require("./strategies/auth.jwt-access.strategy");
const auth_jwt_refresh_strategy_1 = require("./strategies/auth.jwt-refresh.strategy");
const auth_local_strategy_1 = require("./strategies/auth.local.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            axios_1.HttpModule,
            token_repository_module_1.TokenRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            role_repository_module_1.RoleRepositoryModule,
            permission_repository_module_1.PermissionRepositoryModule,
            mail_module_1.MailModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('auth.jwt.accessSecret'),
                    signOptions: {
                        expiresIn: configService.get('auth.jwt.accessLifeTime'),
                    },
                }),
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            auth_password_service_1.AuthPasswordService,
            auth_zalo_service_1.AuthZaloService,
            auth_email_token_service_1.AuthEmailTokenService,
            auth_local_strategy_1.AuthLocalStrategy,
            auth_jwt_access_strategy_1.AuthJwtAccessStrategy,
            auth_jwt_refresh_strategy_1.AuthJwtRefreshStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map