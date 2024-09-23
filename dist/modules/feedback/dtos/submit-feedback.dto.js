"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionFeedbackDto = void 0;
const openapi = require("@nestjs/swagger");
const submission_form_question_dto_1 = require("../../form-question/dtos/submission-form-question.dto");
class SubmissionFeedbackDto extends submission_form_question_dto_1.CreateSubmissionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SubmissionFeedbackDto = SubmissionFeedbackDto;
//# sourceMappingURL=submit-feedback.dto.js.map