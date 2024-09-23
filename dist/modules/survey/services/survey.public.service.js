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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyPublicService = void 0;
const app_enum_1 = require("../../../app/constant/app.enum");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const event_guest_repository_1 = require("../../event/repository/repositories/event-guest.repository");
const submission_repository_1 = require("../../form-question/repository/repositories/submission.repository");
const form_question_service_1 = require("../../form-question/services/form-question.service");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const survey_repository_1 = require("../repository/repositories/survey.repository");
let SurveyPublicService = class SurveyPublicService {
    surveyRepository;
    submissionRepository;
    eventGuestRepository;
    formQuestionService;
    surveyMessage;
    eventGuestMessage;
    constructor(i18nService, surveyRepository, submissionRepository, eventGuestRepository, formQuestionService) {
        this.surveyRepository = surveyRepository;
        this.submissionRepository = submissionRepository;
        this.eventGuestRepository = eventGuestRepository;
        this.formQuestionService = formQuestionService;
        this.surveyMessage = new message_service_1.MessageService(i18nService, 'survey');
        this.eventGuestMessage = new message_service_1.MessageService(i18nService, 'event-guest');
    }
    async getList(user) {
        const surveys = await this.surveyRepository.getByUser(user.id);
        const submissions = await this.submissionRepository.getByUser(user.id, app_enum_1.EFormType.survey);
        const submissionFormIds = new Set(submissions.map((s) => s?.form_question?.form_id));
        const response = [];
        surveys.forEach((survey) => {
            if (submissionFormIds.has(survey?.id)) {
                response.push(Object.assign({}, {
                    data: survey,
                    status: app_enum_1.ESurveyFormStatus.success,
                }));
            }
            else {
                response.push(Object.assign({}, {
                    data: survey,
                    status: survey.status === app_enum_1.EStatus.inactive
                        ? app_enum_1.ESurveyFormStatus.expired
                        : app_enum_1.ESurveyFormStatus.inprogress,
                }));
            }
        });
        return response;
    }
    async getById(id) {
        const app = await this.surveyRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.surveyMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async getFormQuestion(user, id) {
        const form = await this.surveyRepository.getFormQuestion(user.id, id);
        const isSubmit = form.form_questions.some((fq) => fq.submissions.length > 0);
        if (isSubmit) {
            Object.assign(form, {
                status: app_enum_1.ESurveyFormStatus.success,
            });
        }
        else {
            Object.assign(form, {
                status: form.status === app_enum_1.EStatus.inactive
                    ? app_enum_1.ESurveyFormStatus.expired
                    : app_enum_1.ESurveyFormStatus.inprogress,
            });
        }
        return form;
    }
    async submit(user, input) {
        const eventGuest = await this.eventGuestRepository.getByForm(input.form_id, app_enum_1.EFormType.survey, user.id);
        if (!eventGuest) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.eventGuestMessage.get('NOT_FOUND'));
        }
        await this.formQuestionService.verifySubmission(input, eventGuest.id, app_enum_1.EFormType.survey);
        await this.formQuestionService.submitFormQuestion(eventGuest.id, input);
    }
};
exports.SurveyPublicService = SurveyPublicService;
exports.SurveyPublicService = SurveyPublicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService,
        survey_repository_1.SurveyRepository,
        submission_repository_1.SubmissionRepository,
        event_guest_repository_1.EventGuestRepository,
        form_question_service_1.FormQuestionService])
], SurveyPublicService);
//# sourceMappingURL=survey.public.service.js.map