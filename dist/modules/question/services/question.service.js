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
exports.QuestionService = void 0;
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const nestjs_i18n_1 = require("nestjs-i18n");
const create_question_dto_1 = require("../dtos/create-question.dto");
const question_repository_1 = require("../repository/repositories/question.repository");
let QuestionService = class QuestionService {
    questionRepository;
    questionMessage;
    constructor(questionRepository, i18nService) {
        this.questionRepository = questionRepository;
        this.questionMessage = new message_service_1.MessageService(i18nService, 'question');
    }
    async create(input) {
        const transformedInput = (0, class_transformer_1.plainToClass)(create_question_dto_1.CreateQuestionDto, {
            ...input,
            answers: input.answers?.map((a) => (0, object_util_1.objOmit)(a, ['id'])),
        });
        return await this.questionRepository.save(transformedInput);
    }
    async getById(id) {
        const app = await this.questionRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.questionMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async getList(params) {
        const [data, count] = await this.questionRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async delete(id) {
        const app = await this.getById(id);
        await this.questionRepository.remove(app);
    }
    async upsert(input) {
        let existingQuestion = null;
        if (input?.id) {
            existingQuestion = await this.questionRepository.findOne({
                where: { id: input.id },
            });
        }
        if (existingQuestion) {
            Object.assign(existingQuestion, input);
        }
        else {
            const answers = input.answers.map((answer) => ({ ...(0, object_util_1.objOmit)(answer, ['id']) }));
            existingQuestion = this.questionRepository.create({ ...input, answers });
        }
        return await this.questionRepository.save(existingQuestion);
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository,
        nestjs_i18n_1.I18nService])
], QuestionService);
//# sourceMappingURL=question.service.js.map