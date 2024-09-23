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
exports.FormQuestionService = void 0;
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const answer_repository_1 = require("../../question/repository/repositories/answer.repository");
const question_repository_1 = require("../../question/repository/repositories/question.repository");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("typeorm");
const form_question_repository_1 = require("../repository/repositories/form-question.repository");
const submission_repository_1 = require("../repository/repositories/submission.repository");
const submission_answer_repository_1 = require("../repository/repositories/submission-answer.repository");
let FormQuestionService = class FormQuestionService {
    formQuestionRepository;
    questionRepository;
    answerRepository;
    submissionRepository;
    submissionAnswerRepository;
    formQuestionMessage;
    constructor(formQuestionRepository, questionRepository, answerRepository, submissionRepository, submissionAnswerRepository, i18nService) {
        this.formQuestionRepository = formQuestionRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.submissionRepository = submissionRepository;
        this.submissionAnswerRepository = submissionAnswerRepository;
        this.formQuestionMessage = new message_service_1.MessageService(i18nService, 'form-question');
    }
    async getById(id) {
        const app = await this.formQuestionRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.formQuestionMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async getList(params) {
        const [data, count] = await this.formQuestionRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async delete(id) {
        const app = await this.getById(id);
        await this.formQuestionRepository.remove(app);
    }
    async createFormQuestion(input, option) {
        const formPromises = input.map(async (item, index) => {
            const question = await this.questionRepository.save(item.question);
            if (question) {
                const formData = {
                    order: index + 1,
                    form_id: option.form_id,
                    form_type: option.form_type,
                    question_id: question.id,
                };
                this.formQuestionRepository.save(formData);
            }
        });
        await Promise.all(formPromises);
    }
    async updateFormQuestion(input, option) {
        const questionsToRemove = await this.formQuestionRepository.find({
            where: {
                form_id: option.form_id,
                form_type: option.form_type,
            },
            select: ['question_id'],
        });
        if (questionsToRemove.length > 0) {
            const questionIdsToRemove = questionsToRemove.map((item) => item.question_id);
            await this.answerRepository.delete({
                question_id: (0, typeorm_1.In)(questionIdsToRemove),
            });
            await this.formQuestionRepository.delete({
                form_id: option.form_id,
                form_type: option.form_type,
                question_id: (0, typeorm_1.In)(questionIdsToRemove),
            });
            await this.questionRepository.delete({
                id: (0, typeorm_1.In)(questionIdsToRemove),
            });
        }
        await this.createFormQuestion(input, option);
    }
    async submitFormQuestion(event_guest_id, input) {
        if (event_guest_id && input?.submission_form?.length > 0) {
            const submission = input.submission_form.map((v) => Object.assign(v, { event_guest_id }));
            await this.submissionRepository.save(submission);
        }
    }
    async verifySubmission(input, event_guest_id, form_type) {
        const submission = await this.submissionRepository.getByEventGuest(event_guest_id, form_type, input.form_id);
        if (submission.length > 0) {
            throw new custom_error_exception_1.default(404, 'EXIST', this.formQuestionMessage.get('EXIST'));
        }
    }
    async insertListFormQuestion(params) {
        await this.formQuestionRepository.save(params);
    }
};
exports.FormQuestionService = FormQuestionService;
exports.FormQuestionService = FormQuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_question_repository_1.FormQuestionRepository,
        question_repository_1.QuestionRepository,
        answer_repository_1.AnswerRepository,
        submission_repository_1.SubmissionRepository,
        submission_answer_repository_1.SubmissionAnswerRepository,
        nestjs_i18n_1.I18nService])
], FormQuestionService);
//# sourceMappingURL=form-question.service.js.map