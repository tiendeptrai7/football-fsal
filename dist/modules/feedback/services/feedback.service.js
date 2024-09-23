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
exports.FeedbackService = void 0;
const app_constant_1 = require("../../../app/constant/app.constant");
const app_enum_1 = require("../../../app/constant/app.enum");
const cache_service_1 = require("../../../common/cache/services/cache.service");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const event_service_1 = require("../../event/services/event.service");
const form_question_entity_1 = require("../../form-question/repository/entities/form-question.entity");
const form_question_service_1 = require("../../form-question/services/form-question.service");
const question_service_1 = require("../../question/services/question.service");
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
const feedback_document_entity_1 = require("../repository/entities/feedback-document.entity");
const feedback_repository_1 = require("../repository/repositories/feedback.repository");
const feedback_document_service_1 = require("./feedback-document.service");
let FeedbackService = class FeedbackService {
    cacheService;
    eventService;
    questionService;
    formQuestionService;
    feedbackDocumentService;
    feedbackRepository;
    eventMessage;
    feedbackMessage;
    constructor(i18nService, cacheService, eventService, questionService, formQuestionService, feedbackDocumentService, feedbackRepository) {
        this.cacheService = cacheService;
        this.eventService = eventService;
        this.questionService = questionService;
        this.formQuestionService = formQuestionService;
        this.feedbackDocumentService = feedbackDocumentService;
        this.feedbackRepository = feedbackRepository;
        this.eventMessage = new message_service_1.MessageService(i18nService, 'event');
        this.feedbackMessage = new message_service_1.MessageService(i18nService, 'feedback');
    }
    async getList(params) {
        const [data, count] = await this.feedbackRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getById(id) {
        const app = await this.feedbackRepository.findOne({
            where: { id, form_questions: { form_type: app_enum_1.EFormType.feedback } },
            relations: [
                'event',
                'feedback_documents',
                'form_questions',
                'form_questions.question',
                'form_questions.question.answers',
            ],
        });
        if (!app) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.feedbackMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async create(input) {
        const event = await this.eventService.getById(input.event_id);
        if (!event) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.eventMessage.get('NOT_FOUND'));
        }
        const code = await this._getINCRCode();
        const { form_questions, ...createFeedbackDto } = input;
        Object.assign(createFeedbackDto, { code });
        const feedback = await this.feedbackRepository.save(createFeedbackDto);
        const formQuestions = [];
        for (const [index, insertFormQuestionDto] of form_questions.entries()) {
            const question = await this.questionService.create(insertFormQuestionDto.question);
            formQuestions.push(Object.assign({}, {
                order: index + 1,
                form_id: feedback.id,
                form_type: app_enum_1.EFormType.feedback,
                question_id: question.id,
            }));
        }
        await this.formQuestionService.insertListFormQuestion(formQuestions);
    }
    async update(input) {
        const event = await this.eventService.getById(input.event_id);
        if (!event) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.eventMessage.get('NOT_FOUND'));
        }
        const feedback = await this.feedbackRepository.findOne({
            where: {
                id: input.id,
            },
            relations: ['form_questions', 'feedback_documents'],
        });
        if (!feedback) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.feedbackMessage.get('NOT_FOUND'));
        }
        const { form_questions, feedback_documents, ...updateData } = input;
        Object.assign(feedback, updateData);
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
                form_id: feedback.id,
                form_type: app_enum_1.EFormType.feedback,
                question_id: question.id,
            });
            formQuestions.push(formQuestion);
        }
        feedback.form_questions = formQuestions;
        const feedbackDocuments = [];
        for (const updateFeedbackDocumentDto of feedback_documents) {
            let feedbackDocument;
            if (updateFeedbackDocumentDto.id) {
                feedbackDocument = await this.feedbackDocumentService.getById(updateFeedbackDocumentDto.id);
                if (!feedbackDocument) {
                    throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.feedbackMessage.get('NOT_FOUND'));
                }
            }
            else {
                feedbackDocument = new feedback_document_entity_1.FeedbackDocument();
            }
            Object.assign(feedbackDocument, {
                url: updateFeedbackDocumentDto.url,
                feedback_id: feedback.id,
            });
            feedbackDocuments.push(feedbackDocument);
        }
        feedback.feedback_documents = feedbackDocuments;
        await this.feedbackRepository.save(feedback);
    }
    async toggle(id) {
        const event = await this.feedbackRepository.findOneBy({ id });
        if (!event) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.feedbackMessage.get('NOT_FOUND'));
        }
        const status = event.status ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.feedbackRepository.update({ id }, { status });
    }
    async _getINCRCode() {
        const getLastCode = async () => {
            const lastRecord = await this.feedbackRepository.findOne({
                where: {},
                order: {
                    id: 'DESC',
                },
            });
            return lastRecord?.code || '';
        };
        const identifier = `${(0, dayjs_1.default)().format('YYYY_MM')}`;
        return this.cacheService.generateCodeINCR(app_constant_1.INCREMENT_CODE.FEEDBACK, 'FB', identifier, getLastCode);
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService,
        cache_service_1.CacheService,
        event_service_1.EventService,
        question_service_1.QuestionService,
        form_question_service_1.FormQuestionService,
        feedback_document_service_1.FeedbackDocumentService,
        feedback_repository_1.FeedbackRepository])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map