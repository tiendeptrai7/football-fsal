"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionSurveyDto = void 0;
const openapi = require("@nestjs/swagger");
const submission_form_question_dto_1 = require("../../form-question/dtos/submission-form-question.dto");
class SubmissionSurveyDto extends submission_form_question_dto_1.CreateSubmissionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SubmissionSurveyDto = SubmissionSurveyDto;
//# sourceMappingURL=submit-survey.dto.js.map