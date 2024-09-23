"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feedback_entity_1 = require("./entities/feedback.entity");
const feedback_document_entity_1 = require("./entities/feedback-document.entity");
const feedback_repository_1 = require("./repositories/feedback.repository");
const feedback_document_repository_1 = require("./repositories/feedback-document.repository");
let FeedbackRepositoryModule = class FeedbackRepositoryModule {
};
exports.FeedbackRepositoryModule = FeedbackRepositoryModule;
exports.FeedbackRepositoryModule = FeedbackRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [feedback_repository_1.FeedbackRepository, feedback_document_repository_1.FeedbackDocumentRepository],
        exports: [feedback_repository_1.FeedbackRepository, feedback_document_repository_1.FeedbackDocumentRepository],
        imports: [typeorm_1.TypeOrmModule.forFeature([feedback_entity_1.Feedback, feedback_document_entity_1.FeedbackDocument])],
    })
], FeedbackRepositoryModule);
//# sourceMappingURL=feedback.repository.module.js.map