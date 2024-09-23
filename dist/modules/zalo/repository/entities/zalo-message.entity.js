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
exports.ZaloMessage = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const user_entity_1 = require("../../../user/repository/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let ZaloMessage = class ZaloMessage extends base_entity_1.BaseEntity {
    from_id;
    from_display_name;
    from_avatar;
    to_id;
    to_display_name;
    to_avatar;
    event_name;
    message_id;
    quote_message_id;
    message;
    timestamp;
    attachments;
    comment;
    observe_by;
    observer;
    static _OPENAPI_METADATA_FACTORY() {
        return { from_id: { required: true, type: () => String }, from_display_name: { required: true, type: () => String }, from_avatar: { required: true, type: () => String }, to_id: { required: true, type: () => String }, to_display_name: { required: true, type: () => String }, to_avatar: { required: true, type: () => String }, event_name: { required: true, enum: require("../../../../app/constant/app.enum").EZaloEventTypes }, message_id: { required: true, type: () => String }, quote_message_id: { required: true, type: () => String }, message: { required: true, type: () => String }, timestamp: { required: true, type: () => Number }, attachments: { required: true, type: () => String }, comment: { required: true, type: () => String }, observe_by: { required: true, type: () => String }, observer: { required: true, type: () => require("../../../user/repository/entities/user.entity").User } };
    }
};
exports.ZaloMessage = ZaloMessage;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "from_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "from_display_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "from_avatar", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "to_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "to_display_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "to_avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "event_name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ZaloMessage.prototype, "message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "quote_message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 4000 }),
    __metadata("design:type", String)
], ZaloMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'bigint',
        transformer: {
            from: (value) => Number(value),
            to: (value) => value,
        },
    }),
    __metadata("design:type", Number)
], ZaloMessage.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
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
    __metadata("design:type", String)
], ZaloMessage.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 1000 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ZaloMessage.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ZaloMessage.prototype, "observe_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'observe_by' }),
    __metadata("design:type", user_entity_1.User)
], ZaloMessage.prototype, "observer", void 0);
exports.ZaloMessage = ZaloMessage = __decorate([
    (0, typeorm_1.Entity)()
], ZaloMessage);
//# sourceMappingURL=zalo-message.entity.js.map