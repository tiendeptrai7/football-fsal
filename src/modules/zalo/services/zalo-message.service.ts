import { StringDict } from '@app/types/app.type';
import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { ExcelService } from '@common/excel/services/excel.service';
import { ExportResponse } from '@common/response/types/base.reponse.type';
import { formatDateVN } from '@common/utils/date.util';
import { wrapPagination } from '@common/utils/object.util';
import { upperCaseFirstLetter } from '@common/utils/string.util';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { FilterZaloMessageDto } from '../dtos/filter-zalo-message.dto';
import { ObserveMessageDto } from '../dtos/update-zalo-message.dto';
import { ZaloMessage } from '../repository/entities/zalo-message.entity';
import { ZaloMessageRepository } from '../repository/repositories/zalo-message.repository';

@Injectable()
export class ZaloMessageService {
  constructor(
    private readonly excelService: ExcelService,
    private readonly zaloMessageRepository: ZaloMessageRepository,
  ) {}

  async getListOAMessage(
    params: FilterZaloMessageDto,
  ): Promise<ListPaginate<ZaloMessage>> {
    const [data, count] =
      await this.zaloMessageRepository.getZaloOAMessages(params);

    return wrapPagination<ZaloMessage>(data, count, params);
  }

  async getObserverList(): Promise<
    { observer_id: string; observer_name: string }[]
  > {
    return await this.zaloMessageRepository.getObserverList();
  }

  async observeMessage(user: AuthUser, body: ObserveMessageDto): Promise<void> {
    await this.zaloMessageRepository.update(
      { id: In(body.message_ids) },
      { observe_by: user.id, comment: body.comment },
    );
  }

  // async export(params: FilterZaloMessageDto): Promise<ExportResponse> {
  //   const header: StringDict = {
  //     sent_time: 'Sent time', // timestamp
  //     from_id: 'Zalo ID',
  //     from_display_name: 'Zalo Name',
  //     activities: 'Activities', // base on from id to get this status
  //     to_display_name: 'Reply Zalo',
  //     message_type: 'Messages type', // from event_name
  //     message: 'Message',
  //     initial: 'Initial',
  //     observer_name: 'Observer',
  //   };

  //   const workbook = await this.excelService.exportDataToExcel(
  //     async (page, limit) => {
  //       params.page = page;
  //       params.limit = limit;
  //       const [data] = await this.zaloMessageRepository.getZaloOAMessages(
  //         params,
  //         true,
  //       );

  //       return [
  //         data?.map((d) => {
  //           const sentDate = new Date(d.timestamp);

  //           return {
  //             sent_time: formatDateVN(sentDate),
  //             from_id: d.from_id,
  //             from_display_name: d.from_display_name,
  //             activities: d.from_id ? 'Sent' : 'Response',
  //             to_display_name: !d.from_id ? d.to_display_name : '',
  //             message_type: upperCaseFirstLetter(d.event_name.split('_').pop()),
  //             message: d.message,
  //             initial: d.observer?.profile?.upi || '',
  //             observer_name: d.observer?.profile?.full_name || '',
  //           };
  //         }),
  //         0,
  //       ];
  //     },
  //     header,
  //     'ZaloMessages',
  //   );

  //   return {
  //     key: await this.excelService.uploadWorkBookToS3(workbook, 'ZaloMessages'),
  //   };
  // }
}
