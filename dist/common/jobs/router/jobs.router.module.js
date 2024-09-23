"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsRouterModule = void 0;
const zalo_module_1 = require("../../../modules/zalo/zalo.module");
const common_1 = require("@nestjs/common");
const refresh_token_job_1 = require("./zalo/refresh-token.job");
let JobsRouterModule = class JobsRouterModule {
};
exports.JobsRouterModule = JobsRouterModule;
exports.JobsRouterModule = JobsRouterModule = __decorate([
    (0, common_1.Module)({
        providers: [refresh_token_job_1.RefreshZaloTokenJob],
        exports: [refresh_token_job_1.RefreshZaloTokenJob],
        imports: [zalo_module_1.ZaloModule],
        controllers: [],
    })
], JobsRouterModule);
//# sourceMappingURL=jobs.router.module.js.map