import { ListPaginate } from '@common/database/types/database.type';
import { I18nService } from 'nestjs-i18n';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { FilterQuestionDto } from '../dtos/filter-question.dto';
import { UpdateQuestionDto$ } from '../dtos/update-question.dto';
import { Question } from '../repository/entities/question.entity';
import { QuestionRepository } from '../repository/repositories/question.repository';
export declare class QuestionService {
    private readonly questionRepository;
    private questionMessage;
    constructor(questionRepository: QuestionRepository, i18nService: I18nService);
    create(input: CreateQuestionDto): Promise<Question>;
    getById(id: number): Promise<Question>;
    getList(params: FilterQuestionDto): Promise<ListPaginate<Question>>;
    delete(id: number): Promise<void>;
    upsert(input: UpdateQuestionDto$): Promise<Question>;
}
