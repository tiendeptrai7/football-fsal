"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModule = void 0;
const event_module_1 = require("../event/event.module");
const form_question_module_1 = require("../form-question/form-question.module");
const question_module_1 = require("../question/question.module");
const common_1 = require("@nestjs/common");
const feedback_repository_module_1 = require("./repository/feedback.repository.module");
const feedback_public_service_1 = require("./services/feedback.public.service");
const feedback_service_1 = require("./services/feedback.service");
const feedback_document_service_1 = require("./services/feedback-document.service");
let FeedbackModule = class FeedbackModule {
};
exports.FeedbackModule = FeedbackModule;
exports.FeedbackModule = FeedbackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_module_1.EventModule,
            question_module_1.QuestionModule,
            form_question_module_1.FormQuestionModule,
            feedback_repository_module_1.FeedbackRepositoryModule,
        ],
        providers: [feedback_service_1.FeedbackService, feedback_document_service_1.FeedbackDocumentService, feedback_public_service_1.FeedbackPublicService],
        exports: [feedback_service_1.FeedbackService, feedback_document_service_1.FeedbackDocumentService, feedback_public_service_1.FeedbackPublicService],
        controllers: [],
    })
], FeedbackModule);
//# sourceMappingURL=feedback.module.js.map