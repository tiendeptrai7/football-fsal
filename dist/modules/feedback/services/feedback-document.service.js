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
exports.FeedbackDocumentService = void 0;
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const feedback_document_repository_1 = require("../repository/repositories/feedback-document.repository");
let FeedbackDocumentService = class FeedbackDocumentService {
    feedbackDocumentRepository;
    feedbackDocumentMessage;
    constructor(i18nService, feedbackDocumentRepository) {
        this.feedbackDocumentRepository = feedbackDocumentRepository;
        this.feedbackDocumentMessage = new message_service_1.MessageService(i18nService, 'feedback-document');
    }
    async getById(id) {
        const feedbackDocument = await this.feedbackDocumentRepository.findOneBy({
            id,
        });
        if (!feedbackDocument)
            throw new custom_error_exception_1.default(common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', this.feedbackDocumentMessage.get('NOT_FOUND'));
        return feedbackDocument;
    }
};
exports.FeedbackDocumentService = FeedbackDocumentService;
exports.FeedbackDocumentService = FeedbackDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService,
        feedback_document_repository_1.FeedbackDocumentRepository])
], FeedbackDocumentService);
//# sourceMappingURL=feedback-document.service.js.map