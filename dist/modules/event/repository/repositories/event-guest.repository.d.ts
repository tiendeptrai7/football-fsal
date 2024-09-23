import { EFormType } from '@app/constant/app.enum';
import { FilterEventGuestDto } from '@modules/event/dtos/filter-event-guest.dto';
import { ReportSurveyUserDto } from '@modules/survey/dtos/chart-report.dto';
import { FilterParticipantDto } from '@modules/survey/dtos/participant-report-filter.dto';
import { DataSource, Repository } from 'typeorm';
import { EventGuest } from '../entities/event-guest.entity';
export declare class EventGuestRepository extends Repository<EventGuest> {
    constructor(dataSource: DataSource);
    getList(params: FilterEventGuestDto): Promise<[EventGuest[], number]>;
    getByUser(user_id: string): Promise<EventGuest>;
    getByForm(form_id: number, form_type: EFormType, user_id: string): Promise<EventGuest>;
    getListParticipantReport(params: FilterParticipantDto): Promise<[EventGuest[], number]>;
    getSurveyReportByUser(param: ReportSurveyUserDto, id: number): Promise<EventGuest>;
    getTicket(codeOrId: string | number): Promise<EventGuest>;
}
