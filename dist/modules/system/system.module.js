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
exports.SystemModule = void 0;
const common_1 = require("@nestjs/common");
const system_repository_module_1 = require("./repository/system.repository.module");
const system_service_1 = require("./services/system.service");
let SystemModule = class SystemModule {
    systemService;
    constructor(systemService) {
        this.systemService = systemService;
    }
    onApplicationBootstrap() {
        this.systemService.cachingDefaultValue().then();
    }
};
exports.SystemModule = SystemModule;
exports.SystemModule = SystemModule = __decorate([
    (0, common_1.Module)({
        imports: [system_repository_module_1.SystemRepositoryModule],
        exports: [system_service_1.SystemService],
        providers: [system_service_1.SystemService],
        controllers: [],
    }),
    __metadata("design:paramtypes", [system_service_1.SystemService])
], SystemModule);
//# sourceMappingURL=system.module.js.map