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
exports.System = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let System = class System extends base_entity_1.BaseEntity {
    name;
    key;
    value;
    unit;
    group;
    status;
    is_public;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, key: { required: true, type: () => String }, value: { required: true, type: () => String }, unit: { required: true, enum: require("../../../../app/constant/app.enum").ESystemType }, group: { required: true, type: () => String }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, is_public: { required: true, enum: require("../../../../app/constant/app.enum").EStatus } };
    }
};
exports.System = System;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], System.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], System.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        transformer: {
            to(value) {
                if (Object.prototype.toString.call(value) === '[object Array]') {
                    return JSON.stringify(value);
                }
                return value;
            },
            from(value) {
                try {
                    if (isFinite(value))
                        return [value];
                    return JSON.parse(value);
                }
                catch (e) {
                    return value ? [value] : [];
                }
            },
        },
    }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Serialized as JSON if it is an array, otherwise stores as is',
    }),
    __metadata("design:type", String)
], System.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: app_enum_1.ESystemType.text }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], System.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], System.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], System.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], System.prototype, "is_public", void 0);
exports.System = System = __decorate([
    (0, typeorm_1.Entity)()
], System);
//# sourceMappingURL=system.entity.js.map