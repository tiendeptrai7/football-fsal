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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemPublicController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const system_service_1 = require("../services/system.service");
let SystemPublicController = class SystemPublicController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getListPublic() {
        return await this.service.getListPublic();
    }
    async getPublicByKey(key) {
        return await this.service.getPublicByKey(key);
    }
};
exports.SystemPublicController = SystemPublicController;
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("../repository/entities/system.entity").System] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SystemPublicController.prototype, "getListPublic", null);
__decorate([
    (0, common_1.Get)(':key'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../repository/entities/system.entity").System }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SystemPublicController.prototype, "getPublicByKey", null);
exports.SystemPublicController = SystemPublicController = __decorate([
    (0, common_1.Controller)('system'),
    (0, swagger_1.ApiTags)('Systems'),
    __metadata("design:paramtypes", [system_service_1.SystemService])
], SystemPublicController);
//# sourceMappingURL=system.public.controller.js.map