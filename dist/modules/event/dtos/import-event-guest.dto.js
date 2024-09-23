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
exports.ImportEventGuestDto = exports.BaseImportEventGuestDto = void 0;
const openapi = require("@nestjs/swagger");
const import_dto_1 = require("../../../common/request/dtos/import.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseImportEventGuestDto extends import_dto_1.BaseImportDto {
    event_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { event_id: { required: true, type: () => Number } };
    }
}
exports.BaseImportEventGuestDto = BaseImportEventGuestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], BaseImportEventGuestDto.prototype, "event_id", void 0);
class ImportEventGuestDto {
    hcp_code;
    hcp_name;
    static _OPENAPI_METADATA_FACTORY() {
        return { hcp_code: { required: true, type: () => String }, hcp_name: { required: true, type: () => String } };
    }
}
exports.ImportEventGuestDto = ImportEventGuestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ImportEventGuestDto.prototype, "hcp_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImportEventGuestDto.prototype, "hcp_name", void 0);
//# sourceMappingURL=import-event-guest.dto.js.map