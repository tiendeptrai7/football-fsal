"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormQuestionRepositoryModule = void 0;
const question_repository_module_1 = require("../../question/repository/question.repository.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const form_question_entity_1 = require("./entities/form-question.entity");
const form_question_repository_1 = require("./repositories/form-question.repository");
const submission_repository_1 = require("./repositories/submission.repository");
const submission_answer_repository_1 = require("./repositories/submission-answer.repository");
const view_multi_choice_repository_1 = require("./repositories/view-multi-choice.repository");
const view_percentage_repository_1 = require("./repositories/view-percentage.repository");
const view_rating_repository_1 = require("./repositories/view-rating.repository");
const view_single_choice_repository_1 = require("./repositories/view-single-choice.repository");
const view_text_repository_1 = require("./repositories/view-text.repository");
let FormQuestionRepositoryModule = class FormQuestionRepositoryModule {
};
exports.FormQuestionRepositoryModule = FormQuestionRepositoryModule;
exports.FormQuestionRepositoryModule = FormQuestionRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [
            form_question_repository_1.FormQuestionRepository,
            submission_answer_repository_1.SubmissionAnswerRepository,
            submission_repository_1.SubmissionRepository,
            view_multi_choice_repository_1.ViewMultiChoiceRepository,
            view_single_choice_repository_1.ViewSingleChoiceRepository,
            view_text_repository_1.ViewTextRepository,
            view_percentage_repository_1.ViewPercentageRepository,
            view_rating_repository_1.ViewRatingRepository,
        ],
        exports: [
            form_question_repository_1.FormQuestionRepository,
            submission_answer_repository_1.SubmissionAnswerRepository,
            submission_repository_1.SubmissionRepository,
            view_multi_choice_repository_1.ViewMultiChoiceRepository,
            view_single_choice_repository_1.ViewSingleChoiceRepository,
            view_text_repository_1.ViewTextRepository,
            view_percentage_repository_1.ViewPercentageRepository,
            view_rating_repository_1.ViewRatingRepository,
        ],
        imports: [typeorm_1.TypeOrmModule.forFeature([form_question_entity_1.FormQuestion]), question_repository_module_1.QuestionRepositoryModule],
    })
], FormQuestionRepositoryModule);
//# sourceMappingURL=form-question.repository.module.js.map