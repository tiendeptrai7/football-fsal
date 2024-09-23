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
exports.Answer = void 0;
const openapi = require("@nestjs/swagger");
const app_enum_1 = require("../../../../app/constant/app.enum");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const submission_answer_entity_1 = require("../../../form-question/repository/entities/submission-answer.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
let Answer = class Answer extends base_entity_1.BaseEntity {
    content;
    require_input;
    question_id;
    question;
    submission_answers;
    static _OPENAPI_METADATA_FACTORY() {
        return { content: { required: true, type: () => String }, require_input: { required: true, enum: require("../../../../app/constant/app.enum").EStatus }, question_id: { required: true, type: () => Number }, question: { required: true, type: () => require("./question.entity").Question }, submission_answers: { required: true, type: () => [require("../../../form-question/repository/entities/submission-answer.entity").SubmissionAnswer] } };
    }
};
exports.Answer = Answer;
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: app_enum_1.EStatus.inactive }),
    (0, swagger_1.ApiProperty)({ enum: app_enum_1.EStatus }),
    __metadata("design:type", Number)
], Answer.prototype, "require_input", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Answer.prototype, "question_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, (question) => question.answers),
    (0, typeorm_1.JoinColumn)({ name: 'question_id' }),
    __metadata("design:type", question_entity_1.Question)
], Answer.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_answer_entity_1.SubmissionAnswer, (submission_answer) => submission_answer.answer),
    __metadata("design:type", Array)
], Answer.prototype, "submission_answers", void 0);
exports.Answer = Answer = __decorate([
    (0, typeorm_1.Entity)()
], Answer);
//# sourceMappingURL=answer.entity.js.map