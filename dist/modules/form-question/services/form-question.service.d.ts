import { EFormType } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import { AnswerRepository } from '@modules/question/repository/repositories/answer.repository';
import { QuestionRepository } from '@modules/question/repository/repositories/question.repository';
import { I18nService } from 'nestjs-i18n';
import { CreateFormQuestionDto, FormOptionDto, UpdateFormQuestionDto } from '../dtos/create-form-question.dto';
import { FilterFormQuestionDto } from '../dtos/filter-form-question.dto';
import { CreateSubmissionDto } from '../dtos/submission-form-question.dto';
import { FormQuestion } from '../repository/entities/form-question.entity';
import { FormQuestionRepository } from '../repository/repositories/form-question.repository';
import { SubmissionRepository } from '../repository/repositories/submission.repository';
import { SubmissionAnswerRepository } from '../repository/repositories/submission-answer.repository';
export declare class FormQuestionService {
    private readonly formQuestionRepository;
    private readonly questionRepository;
    private readonly answerRepository;
    private readonly submissionRepository;
    private readonly submissionAnswerRepository;
    private formQuestionMessage;
    constructor(formQuestionRepository: FormQuestionRepository, questionRepository: QuestionRepository, answerRepository: AnswerRepository, submissionRepository: SubmissionRepository, submissionAnswerRepository: SubmissionAnswerRepository, i18nService: I18nService);
    getById(id: number): Promise<FormQuestion>;
    getList(params: FilterFormQuestionDto): Promise<ListPaginate<FormQuestion>>;
    delete(id: number): Promise<void>;
    createFormQuestion(input: CreateFormQuestionDto[], option: FormOptionDto): Promise<void>;
    updateFormQuestion(input: UpdateFormQuestionDto[], option: FormOptionDto): Promise<void>;
    submitFormQuestion(event_guest_id: number, input: CreateSubmissionDto): Promise<void>;
    verifySubmission(input: CreateSubmissionDto, event_guest_id: number, form_type: EFormType): Promise<void>;
    insertListFormQuestion(params: CreateFormQuestionDto[]): Promise<void>;
}
