import { EFormType } from '@app/constant/app.enum';
import { DataSource, Repository } from 'typeorm';
import { Submission } from '../entities/submission.entity';
export declare class SubmissionRepository extends Repository<Submission> {
    constructor(dataSource: DataSource);
    getByUser(user_id: string, type: EFormType, form_id?: number): Promise<Submission[]>;
    getByEventGuest(event_guest_id: number, type: EFormType, form_id: number): Promise<Submission[]>;
}
