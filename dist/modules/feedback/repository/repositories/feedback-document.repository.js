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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackDocumentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const feedback_document_entity_1 = require("../entities/feedback-document.entity");
let FeedbackDocumentRepository = class FeedbackDocumentRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(feedback_document_entity_1.FeedbackDocument, dataSource.createEntityManager());
    }
    async getByUser(user_id, feedback_id) {
        return await this.createQueryBuilder('feedback-document')
            .leftJoin('feedback-document.feedback', 'feedback')
            .leftJoin('feedback.event', 'event')
            .leftJoin('event.event_guest', 'event_guest')
            .leftJoin('event_guest.hcp', 'hcp')
            .leftJoin('hcp.user', 'user')
            .where('user.id =:user_id AND feedback-document.feedback_id = :feedback_id', {
            user_id,
            feedback_id,
        })
            .getMany();
    }
};
exports.FeedbackDocumentRepository = FeedbackDocumentRepository;
exports.FeedbackDocumentRepository = FeedbackDocumentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FeedbackDocumentRepository);
//# sourceMappingURL=feedback-document.repository.js.map