"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormQuestionModule = void 0;
const question_repository_module_1 = require("../question/repository/question.repository.module");
const common_1 = require("@nestjs/common");
const form_question_repository_module_1 = require("./repository/form-question.repository.module");
const submission_repository_1 = require("./repository/repositories/submission.repository");
const form_question_service_1 = require("./services/form-question.service");
let FormQuestionModule = class FormQuestionModule {
};
exports.FormQuestionModule = FormQuestionModule;
exports.FormQuestionModule = FormQuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [form_question_repository_module_1.FormQuestionRepositoryModule, question_repository_module_1.QuestionRepositoryModule],
        providers: [form_question_service_1.FormQuestionService, submission_repository_1.SubmissionRepository],
        exports: [form_question_service_1.FormQuestionService, submission_repository_1.SubmissionRepository],
        controllers: [],
    })
], FormQuestionModule);
//# sourceMappingURL=form-question.module.js.map