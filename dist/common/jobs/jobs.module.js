"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JobsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const jobs_router_module_1 = require("./router/jobs.router.module");
let JobsModule = JobsModule_1 = class JobsModule {
    static forRoot() {
        const imports = [];
        if (process.env.JOB_ENABLE === 'true') {
            imports.push(schedule_1.ScheduleModule.forRoot(), jobs_router_module_1.JobsRouterModule);
        }
        return {
            module: JobsModule_1,
            providers: [],
            exports: [],
            controllers: [],
            imports,
        };
    }
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = JobsModule_1 = __decorate([
    (0, common_1.Module)({})
], JobsModule);
//# sourceMappingURL=jobs.module.js.map