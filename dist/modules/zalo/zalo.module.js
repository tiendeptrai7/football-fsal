"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloModule = void 0;
const system_module_1 = require("../system/system.module");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const zalo_repository_module_1 = require("./repository/zalo.repository.module");
const zalo_hook_service_1 = require("./services/zalo.hook.service");
const zalo_service_1 = require("./services/zalo.service");
const zalo_token_service_1 = require("./services/zalo.token.service");
const zalo_message_service_1 = require("./services/zalo-message.service");
let ZaloModule = class ZaloModule {
};
exports.ZaloModule = ZaloModule;
exports.ZaloModule = ZaloModule = __decorate([
    (0, common_1.Module)({
        imports: [zalo_repository_module_1.ZaloRepositoryModule, system_module_1.SystemModule, axios_1.HttpModule],
        exports: [zalo_hook_service_1.ZaloHookService, zalo_token_service_1.ZaloTokenService, zalo_service_1.ZaloService, zalo_message_service_1.ZaloMessageService],
        providers: [
            zalo_hook_service_1.ZaloHookService,
            zalo_token_service_1.ZaloTokenService,
            zalo_service_1.ZaloService,
            zalo_message_service_1.ZaloMessageService,
        ],
        controllers: [],
    })
], ZaloModule);
//# sourceMappingURL=zalo.module.js.map