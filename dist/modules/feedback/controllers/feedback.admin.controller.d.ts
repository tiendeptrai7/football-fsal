import { ListPaginate } from '@common/database/types/database.type';
import { CreateFeedbackDto } from '../dtos/create-feedback.dto';
import { FilterFeedbackDto } from '../dtos/filter-feedback.dto';
import { UpdateFeedbackDto } from '../dtos/update-feedback.dto';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackService } from '../services/feedback.service';
export declare class FeedbackAdminController {
    private readonly service;
    constructor(service: FeedbackService);
    getList(param: FilterFeedbackDto): Promise<ListPaginate<Feedback>>;
    getById(id: number): Promise<Feedback>;
    create(body: CreateFeedbackDto): Promise<void>;
    update(body: UpdateFeedbackDto): Promise<void>;
    toggle(id: number): Promise<void>;
}
