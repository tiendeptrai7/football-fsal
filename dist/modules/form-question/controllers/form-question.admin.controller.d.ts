import { ListPaginate } from '@common/database/types/database.type';
import { FilterFormQuestionDto } from '../dtos/filter-form-question.dto';
import { FormQuestion } from '../repository/entities/form-question.entity';
import { FormQuestionService } from '../services/form-question.service';
export declare class FormQuestionAdminController {
    private readonly service;
    constructor(service: FormQuestionService);
    getList(param: FilterFormQuestionDto): Promise<ListPaginate<FormQuestion>>;
    getById(id: number): Promise<FormQuestion>;
    delete(id: number): Promise<void>;
}
