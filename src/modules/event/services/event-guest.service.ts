import { EFormType, EStatus } from '@app/constant/app.enum';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExcelService } from '@common/excel/services/excel.service';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { ReportSurveyUserDto } from '@modules/survey/dtos/chart-report.dto';
import { FilterParticipantDto } from '@modules/survey/dtos/participant-report-filter.dto';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { FilterEventGuestDto } from '../dtos/filter-event-guest.dto';
import { UpdateInvitationDto } from '../dtos/update-event-guest.dto';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventGuestRepository } from '../repository/repositories/event-guest.repository';

@Injectable()
export class EventGuestService {
  private eventMessage: MessageService;
  constructor(
    private readonly excelService: ExcelService,
    private readonly eventGuestRepository: EventGuestRepository,
    i18nService: I18nService,
  ) {
    this.eventMessage = new MessageService(i18nService, 'event');
  }

  async getList(
    params: FilterEventGuestDto,
  ): Promise<ListPaginate<EventGuest>> {
    const [data, count] = await this.eventGuestRepository.getList(params);

    return wrapPagination<EventGuest>(data, count, params);
  }

  async getById(id: number): Promise<EventGuest> {
    const app = await this.eventGuestRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.eventMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async delete(id: number): Promise<void> {
    const app = await this.eventGuestRepository.findOne({
      where: { id },
    });

    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.eventMessage.get('EVENT_GUEST_NOT_FOUND'),
      );
    }

    await this.eventGuestRepository.delete(id);
  }

  async toggleQRCode(id: number): Promise<void> {
    const eventGuest = await this.getById(id);
    const qr_status = eventGuest.qr_status ? EStatus.inactive : EStatus.active;
    await this.eventGuestRepository.update({ id }, { qr_status });
  }

  async replyInvitation(user: AuthUser, body: UpdateInvitationDto) {
    const eventGuest = await this.eventGuestRepository.findOneBy({
      qr_code: body.qr_code,
      qr_status: EStatus.active,
    });

    if (!eventGuest) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.eventMessage.get('EVENT_GUEST_NOT_FOUND'),
      );
    }

    Object.assign(eventGuest, { ...body });

    await this.eventGuestRepository.save(eventGuest);
  }

  async getListParticipantReport(
    params: FilterParticipantDto,
  ): Promise<ListPaginate<EventGuest>> {
    const [data, count] =
      await this.eventGuestRepository.getListParticipantReport(params);
    const reportData = data.map((d) => {
      if (d.submissions?.length > 0) {
        d.submissions = d.submissions.filter((submission) => {
          return (
            submission?.form_question?.form_id === params.survey_id &&
            submission?.form_question?.form_type === EFormType.survey
          );
        });
      }
      return Object.assign(d, {
        submit_status:
          d.submissions?.length > 0 ? EStatus.active : EStatus.inactive,
        submit_time: d.submissions?.[0]?.created_at ?? null,
      });
    });
    return wrapPagination<EventGuest>(reportData, count, params);
  }

  async getSurveyReportByUser(
    params: ReportSurveyUserDto,
    id: number,
  ): Promise<EventGuest> {
    const data = await this.eventGuestRepository.getSurveyReportByUser(
      params,
      id,
    );
    return data;
  }
}
