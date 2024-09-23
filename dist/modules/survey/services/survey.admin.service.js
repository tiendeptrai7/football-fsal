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
exports.SurveyAdminService = void 0;
const app_constant_1 = require("../../../app/constant/app.constant");
const app_enum_1 = require("../../../app/constant/app.enum");
const cache_service_1 = require("../../../common/cache/services/cache.service");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const event_service_1 = require("../../event/services/event.service");
const event_guest_service_1 = require("../../event/services/event-guest.service");
const form_question_entity_1 = require("../../form-question/repository/entities/form-question.entity");
const form_question_repository_1 = require("../../form-question/repository/repositories/form-question.repository");
const view_multi_choice_repository_1 = require("../../form-question/repository/repositories/view-multi-choice.repository");
const view_percentage_repository_1 = require("../../form-question/repository/repositories/view-percentage.repository");
const view_single_choice_repository_1 = require("../../form-question/repository/repositories/view-single-choice.repository");
const view_text_repository_1 = require("../../form-question/repository/repositories/view-text.repository");
const form_question_service_1 = require("../../form-question/services/form-question.service");
const question_service_1 = require("../../question/services/question.service");
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
const survey_repository_1 = require("../repository/repositories/survey.repository");
let SurveyAdminService = class SurveyAdminService {
    cacheService;
    eventService;
    eventGuestService;
    questionService;
    surveyRepository;
    formQuestionRepository;
    viewMultiChoiceRepository;
    viewSingleChoiceRepository;
    viewTextRepository;
    viewPercentageRepository;
    formQuestionService;
    eventMessage;
    surveyMessage;
    constructor(i18nService, cacheService, eventService, eventGuestService, questionService, surveyRepository, formQuestionRepository, viewMultiChoiceRepository, viewSingleChoiceRepository, viewTextRepository, viewPercentageRepository, formQuestionService) {
        this.cacheService = cacheService;
        this.eventService = eventService;
        this.eventGuestService = eventGuestService;
        this.questionService = questionService;
        this.surveyRepository = surveyRepository;
        this.formQuestionRepository = formQuestionRepository;
        this.viewMultiChoiceRepository = viewMultiChoiceRepository;
        this.viewSingleChoiceRepository = viewSingleChoiceRepository;
        this.viewTextRepository = viewTextRepository;
        this.viewPercentageRepository = viewPercentageRepository;
        this.formQuestionService = formQuestionService;
        this.eventMessage = new message_service_1.MessageService(i18nService, 'event');
        this.surveyMessage = new message_service_1.MessageService(i18nService, 'survey');
    }
    async getList(params) {
        const [data, count] = await this.surveyRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getById(id) {
        const app = await this.surveyRepository.findOne({
            where: {
                id,
                form_questions: {
                    form_type: app_enum_1.EFormType.survey,
                },
            },
            relations: [
                'form_questions',
                'form_questions.question',
                'form_questions.question.answers',
            ],
        });
        if (!app) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.surveyMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async create(input) {
        const event = await this.eventService.getById(input?.event_id);
        if (!event) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.eventMessage.get('NOT_FOUND'));
        }
        const code = await this._getINCRCode();
        const { form_questions, ...createSurveyDto } = input;
        Object.assign(createSurveyDto, { code });
        const survey = await this.surveyRepository.save(createSurveyDto);
        if (form_questions.length > 0) {
            await this.formQuestionService.createFormQuestion(form_questions, {
                form_id: survey.id,
                form_type: app_enum_1.EFormType.survey,
            });
        }
    }
    async update(input) {
        const survey = await this.getById(input.id);
        const event = await this.eventService.getById(input.event_id);
        if (!event) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.eventMessage.get('NOT_FOUND'));
        }
        if (!survey) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.surveyMessage.get('NOT_FOUND'));
        }
        const { form_questions, ...updateData } = input;
        Object.assign(survey, updateData);
        const formQuestions = [];
        for (const [index, updateFormQuestionDto] of form_questions.entries()) {
            let formQuestion;
            if (updateFormQuestionDto.id) {
                formQuestion = await this.formQuestionService.getById(updateFormQuestionDto.id);
            }
            else {
                formQuestion = new form_question_entity_1.FormQuestion();
            }
            const question = await this.questionService.upsert(updateFormQuestionDto.question);
            Object.assign(formQuestion, {
                order: index + 1,
                form_id: survey.id,
                form_type: app_enum_1.EFormType.survey,
                question_id: question.id,
            });
            formQuestions.push(formQuestion);
        }
        survey.form_questions = formQuestions;
        await this.surveyRepository.save(survey);
    }
    async toggle(id) {
        const survey = await this.getById(id);
        const status = survey.status ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.surveyRepository.update({ id }, { status });
    }
    async copy(id) {
        const survey = await this.surveyRepository.getById(id);
        if (!survey) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.surveyMessage.get('NOT_FOUND'));
        }
        const code = await this._getINCRCode();
        const newSurvey = await this.surveyRepository.save({
            ...survey,
            code: code,
        });
        await this.formQuestionRepository.save(survey.form_questions.map((fq) => Object.assign(fq, { form_id: newSurvey.id })));
    }
    async _getINCRCode() {
        const getLastCode = async () => {
            const lastRecord = await this.surveyRepository.findOne({
                where: {},
                order: {
                    id: 'DESC',
                },
            });
            return lastRecord?.code || '';
        };
        const identifier = `${(0, dayjs_1.default)().format('YYYY_MM')}`;
        return this.cacheService.generateCodeINCR(app_constant_1.INCREMENT_CODE.SURVEY, 'SV', identifier, getLastCode);
    }
    async getListRport(params) {
        const [data, count] = await this.surveyRepository.getListReport(params);
        const dataReport = data.map((d) => {
            return Object.assign(d, {
                event_guest_total: d.event?.event_guest?.length ?? 0,
            });
        });
        return (0, object_util_1.wrapPagination)(dataReport, count, params);
    }
    async getListParticipantReport(params) {
        return await this.eventGuestService.getListParticipantReport(params);
    }
    async getOverviewReport(id) {
        const app = await this.surveyRepository.getOverviewReport(id);
        const reportData = app?.event?.event_guest.map((event_guest) => {
            if (event_guest?.submissions.length > 0) {
                event_guest.submissions = event_guest.submissions.filter((submission) => {
                    return (submission?.form_question?.form_id === id &&
                        submission?.form_question?.form_type === app_enum_1.EFormType.survey);
                });
            }
            return event_guest;
        });
        const total = app?.event?.event_guest?.length ?? 0;
        const completed = reportData.filter((e) => e.submissions.length > 0) ?? [];
        return {
            total_completed: completed.length,
            total_uncompleted: total - completed.length,
        };
    }
    async getDetailReport(id) {
        const app = await this.surveyRepository.getDetailReport(id);
        const reportData = app?.form_questions?.map((form) => {
            return {
                question_type: form?.question?.type,
                question_content: form?.question?.content,
                question_id: form?.question_id,
            };
        });
        return reportData;
    }
    async getBarChart(param, id) {
        const multiChoice = await this.viewMultiChoiceRepository.getBySurvey(param, id);
        const singleChoice = await this.viewSingleChoiceRepository.getBySurvey(param, id);
        const data = [...multiChoice, ...singleChoice];
        return {
            categories: data.map((a) => a.answer_id.toString()),
            data: data.map((a) => a.total.toString()),
        };
    }
    async getShortAnswer(param, id) {
        const data = await this.viewTextRepository.find({
            where: {
                question_id: parseInt(param.question_id),
                form_id: id,
            },
            select: ['answer_text'],
        });
        return data;
    }
    async getLineChart(param, id) {
        const percentage = await this.viewPercentageRepository.find({
            where: {
                question_id: parseInt(param.question_id),
                form_id: id,
            },
            select: ['answer_value', 'question_content'],
        });
        return {
            categories: percentage.map((a) => a.question_content.toString()),
            data: percentage.map((a) => a.answer_value.toString()),
        };
    }
};
exports.SurveyAdminService = SurveyAdminService;
exports.SurveyAdminService = SurveyAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService,
        cache_service_1.CacheService,
        event_service_1.EventService,
        event_guest_service_1.EventGuestService,
        question_service_1.QuestionService,
        survey_repository_1.SurveyRepository,
        form_question_repository_1.FormQuestionRepository,
        view_multi_choice_repository_1.ViewMultiChoiceRepository,
        view_single_choice_repository_1.ViewSingleChoiceRepository,
        view_text_repository_1.ViewTextRepository,
        view_percentage_repository_1.ViewPercentageRepository,
        form_question_service_1.FormQuestionService])
], SurveyAdminService);
//# sourceMappingURL=survey.admin.service.js.map