"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const answer_entity_1 = require("./entities/answer.entity");
const question_entity_1 = require("./entities/question.entity");
const answer_repository_1 = require("./repositories/answer.repository");
const question_repository_1 = require("./repositories/question.repository");
let QuestionRepositoryModule = class QuestionRepositoryModule {
};
exports.QuestionRepositoryModule = QuestionRepositoryModule;
exports.QuestionRepositoryModule = QuestionRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [question_repository_1.QuestionRepository, answer_repository_1.AnswerRepository],
        exports: [question_repository_1.QuestionRepository, answer_repository_1.AnswerRepository],
        imports: [typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question, answer_entity_1.Answer])],
    })
], QuestionRepositoryModule);
//# sourceMappingURL=question.repository.module.js.map