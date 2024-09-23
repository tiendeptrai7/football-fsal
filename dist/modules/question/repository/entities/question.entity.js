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
exports.Question = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const form_question_entity_1 = require("../../../form-question/repository/entities/form-question.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./answer.entity");
let Question = class Question extends base_entity_1.BaseEntity {
    content;
    type;
    is_required;
    answers;
    form_questions;
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: true, type: () => String }, type: { required: true, enum: require("../../../../app/constant/app.enum").EQuestionType }, is_required: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, answers: { required: true, type: () => [require("./answer.entity").Answer] }, form_questions: { required: true, type: () => [require("../../../form-question/repository/entities/form-question.entity").FormQuestion] } };
    }
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EQuestionType.single_choice }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EQuestionType }),
    __metadata("design:type", Number)
], Question.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.active }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Question.prototype, "is_required", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.question, { cascade: true }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => form_question_entity_1.FormQuestion, (fq) => fq.question),
    __metadata("design:type", Array)
], Question.prototype, "form_questions", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)()
], Question);
//# sourceMappingURL=question.entity.js.map