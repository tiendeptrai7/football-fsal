"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyRepositoryModule = void 0;
const form_question_repository_1 = require("../../form-question/repository/repositories/form-question.repository");
const submission_repository_1 = require("../../form-question/repository/repositories/submission.repository");
const view_multi_choice_repository_1 = require("../../form-question/repository/repositories/view-multi-choice.repository");
const view_percentage_repository_1 = require("../../form-question/repository/repositories/view-percentage.repository");
const view_single_choice_repository_1 = require("../../form-question/repository/repositories/view-single-choice.repository");
const view_text_repository_1 = require("../../form-question/repository/repositories/view-text.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_entity_1 = require("./entities/survey.entity");
const survey_repository_1 = require("./repositories/survey.repository");
let SurveyRepositoryModule = class SurveyRepositoryModule {
};
exports.SurveyRepositoryModule = SurveyRepositoryModule;
exports.SurveyRepositoryModule = SurveyRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [
            survey_repository_1.SurveyRepository,
            form_question_repository_1.FormQuestionRepository,
            submission_repository_1.SubmissionRepository,
            view_multi_choice_repository_1.ViewMultiChoiceRepository,
            view_single_choice_repository_1.ViewSingleChoiceRepository,
            view_text_repository_1.ViewTextRepository,
            view_percentage_repository_1.ViewPercentageRepository,
        ],
        exports: [
            survey_repository_1.SurveyRepository,
            form_question_repository_1.FormQuestionRepository,
            submission_repository_1.SubmissionRepository,
            view_multi_choice_repository_1.ViewMultiChoiceRepository,
            view_single_choice_repository_1.ViewSingleChoiceRepository,
            view_text_repository_1.ViewTextRepository,
            view_percentage_repository_1.ViewPercentageRepository,
        ],
        imports: [typeorm_1.TypeOrmModule.forFeature([survey_entity_1.Survey])],
    })
], SurveyRepositoryModule);
//# sourceMappingURL=survey.repository.module.js.map