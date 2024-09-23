import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { ExcelService } from '@common/excel/services/excel.service';
import { ReportSurveyUserDto } from '@modules/survey/dtos/chart-report.dto';
import { FilterParticipantDto } from '@modules/survey/dtos/participant-report-filter.dto';
import { I18nService } from 'nestjs-i18n';
import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { UpdateInvitationDto } from '../dtos/update-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestRepository } from '../repository/repositories/event-guest.repository';
export declare class EventGuestService {
    private readonly excelService;
    private readonly eventGuestRepository;
    private eventMessage;
    constructor(excelService: ExcelService, eventGuestRepository: EventGuestRepository, i18nService: I18nService);
    getList(params: FilterEventGuestDto): Promise<ListPaginate<EventGuest>>;
    getById(id: number): Promise<EventGuest>;
    delete(id: number): Promise<void>;
    toggleQRCode(id: number): Promise<void>;
    replyInvitation(user: AuthUser, body: UpdateInvitationDto): Promise<void>;
    getListParticipantReport(params: FilterParticipantDto): Promise<ListPaginate<EventGuest>>;
    getSurveyReportByUser(params: ReportSurveyUserDto, id: number): Promise<EventGuest>;
}
