"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModule = void 0;
const event_module_1 = require("../event/event.module");
const form_question_module_1 = require("../form-question/form-question.module");
const question_module_1 = require("../question/question.module");
const question_repository_module_1 = require("../question/repository/question.repository.module");
const common_1 = require("@nestjs/common");
const survey_repository_module_1 = require("./repository/survey.repository.module");
const survey_admin_service_1 = require("./services/survey.admin.service");
const survey_public_service_1 = require("./services/survey.public.service");
let SurveyModule = class SurveyModule {
};
exports.SurveyModule = SurveyModule;
exports.SurveyModule = SurveyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            question_repository_module_1.QuestionRepositoryModule,
            survey_repository_module_1.SurveyRepositoryModule,
            event_module_1.EventModule,
            question_module_1.QuestionModule,
            form_question_module_1.FormQuestionModule,
        ],
        exports: [
            survey_admin_service_1.SurveyAdminService,
            survey_public_service_1.SurveyPublicService,
            survey_repository_module_1.SurveyRepositoryModule,
            question_repository_module_1.QuestionRepositoryModule,
            event_module_1.EventModule,
            form_question_module_1.FormQuestionModule,
        ],
        providers: [survey_public_service_1.SurveyPublicService, survey_admin_service_1.SurveyAdminService],
        controllers: [],
    })
], SurveyModule);
//# sourceMappingURL=survey.module.js.map