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
exports.Survey = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const event_entity_1 = require("../../../event/repository/entities/event.entity");
const form_question_entity_1 = require("../../../form-question/repository/entities/form-question.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Survey = class Survey extends base_entity_1.BaseEntity {
    name;
    code;
    status;
    event_id;
    started_at;
    ended_at;
    event;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String }, status: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, event_id: { required: true, type: () => Number }, started_at: { required: true, type: () => Date }, ended_at: { required: true, type: () => Date }, event: { required: true, type: () => require("../../../event/repository/entities/event.entity").Event }, form_questions: { required: true, type: () => [require("../../../form-question/repository/entities/form-question.entity").FormQuestion] } };
    }
};
exports.Survey = Survey;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Survey.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Survey.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.inactive }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Survey.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Survey.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Survey.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Survey.prototype, "ended_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (e) => e.surveys),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], Survey.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_question_entity_1.FormQuestion, (f) => f.survey, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Survey.prototype, "form_questions", void 0);
exports.Survey = Survey = __decorate([
    (0, typeorm_1.Entity)()
], Survey);
//# sourceMappingURL=survey.entity.js.map