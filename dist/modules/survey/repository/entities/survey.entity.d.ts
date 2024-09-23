import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { Event } from '@modules/event/repository/entities/event.entity';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
export declare class Survey extends BaseEntity {
    name: string;
    code: string;
    status: EStatus;
    event_id: number;
    started_at: Date;
    ended_at: Date;
    event: Event;
    form_questions: FormQuestion[];
}
