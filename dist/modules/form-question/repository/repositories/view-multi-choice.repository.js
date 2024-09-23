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
exports.ViewMultiChoiceRepository = void 0;
const app_enum_1 = require("../../../../app/constant/app.enum");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const view_multi_choice_entity_1 = require("../entities/view-multi-choice.entity");
let ViewMultiChoiceRepository = class ViewMultiChoiceRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(view_multi_choice_entity_1.ViewSubmitMultiChoice, dataSource.createEntityManager());
    }
    async getBySurvey(params, id) {
        const query = this.createQueryBuilder('view_submit_multi_choice').groupBy('answer_id, question_id');
        query.where('view_submit_multi_choice.form_id = :id AND view_submit_multi_choice.form_type = :form_type', { id, form_type: app_enum_1.EFormType.survey });
        if (params) {
            query.andWhere('view_submit_multi_choice.question_id = :question_id', {
                question_id: params.question_id,
            });
        }
        query.select([
            'answer_id as answer_id',
            'question_id as question_id',
            'CAST(COUNT(*) AS INTEGER) as total',
        ]);
        return await query.getRawMany();
    }
};
exports.ViewMultiChoiceRepository = ViewMultiChoiceRepository;
exports.ViewMultiChoiceRepository = ViewMultiChoiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ViewMultiChoiceRepository);
//# sourceMappingURL=view-multi-choice.repository.js.map