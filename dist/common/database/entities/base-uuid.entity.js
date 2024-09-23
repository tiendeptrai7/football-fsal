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
exports.BaseUUIDEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_date_entity_1 = require("./base-date.entity");
let BaseUUIDEntity = class BaseUUIDEntity extends base_date_entity_1.BaseDateEntity {
    id;
    deleted_at;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, deleted_at: { required: true, type: () => Date } };
    }
};
exports.BaseUUIDEntity = BaseUUIDEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BaseUUIDEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], BaseUUIDEntity.prototype, "deleted_at", void 0);
exports.BaseUUIDEntity = BaseUUIDEntity = __decorate([
    (0, typeorm_1.Entity)()
], BaseUUIDEntity);
//# sourceMappingURL=base-uuid.entity.js.map