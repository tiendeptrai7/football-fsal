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
exports.FeedbackDocument = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../../../common/database/entities/base.entity");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const feedback_entity_1 = require("./feedback.entity");
let FeedbackDocument = class FeedbackDocument extends base_entity_1.BaseEntity {
    url;
    feedback_id;
    feedback;
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, feedback_id: { required: true, type: () => Number }, feedback: { required: true, type: () => require("./feedback.entity").Feedback } };
    }
};
exports.FeedbackDocument = FeedbackDocument;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeedbackDocument.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FeedbackDocument.prototype, "feedback_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feedback_entity_1.Feedback, (fb) => fb.feedback_documents, {
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'feedback_id' }),
    __metadata("design:type", feedback_entity_1.Feedback)
], FeedbackDocument.prototype, "feedback", void 0);
exports.FeedbackDocument = FeedbackDocument = __decorate([
    (0, typeorm_1.Entity)()
], FeedbackDocument);
//# sourceMappingURL=feedback-document.entity.js.map