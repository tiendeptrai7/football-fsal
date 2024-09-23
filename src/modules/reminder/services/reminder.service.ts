import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { Event } from '@modules/event/repository/entities/event.entity';
import { EventService } from '@modules/event/services/event.service';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { CreateReminderDto } from '../dtos/create-reminder.dto';
import {
  FilterReminderDto,
  FilterReminderPublicDto,
} from '../dtos/filter-reminder.dto';
import { UpdateReminderDto } from '../dtos/update-reminder.dto';
import { Reminder } from '../repository/entities/reminder.entity';
import { ReminderHistory } from '../repository/entities/reminder-history.entity';
import { ReminderRepository } from '../repository/repositories/reminder.repository';
import { ReminderHistoryRepository } from '../repository/repositories/reminder-history.repository';

@Injectable()
export class ReminderService {
  private reminderMessage: MessageService;
  private reminderHistoryMessage: MessageService;

  constructor(
    private readonly reminderRepository: ReminderRepository,
    private readonly reminderHistoryRepository: ReminderHistoryRepository,
    private readonly eventService: EventService,

    i18nService: I18nService,
  ) {
    this.reminderMessage = new MessageService(i18nService, 'reminder');
    this.reminderHistoryMessage = new MessageService(
      i18nService,
      'reminder-history',
    );
  }

  async create(input: CreateReminderDto): Promise<void> {
    await this.reminderRepository.save(input);
  }

  async getById(id: number): Promise<Reminder> {
    const app = await this.reminderRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.reminderMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async getList(params: FilterReminderDto): Promise<ListPaginate<Reminder>> {
    const [data, count] = await this.reminderRepository.getList(params);

    return wrapPagination<Reminder>(data, count, params);
  }

  async getHistoryList(
    params: FilterReminderPublicDto,
    user?: AuthUser,
  ): Promise<ListPaginate<Event>> {
    const [data, count] = await this.eventService.getReminderHistoryList(
      params,
      user?.id,
    );
    return wrapPagination<Event>(data, count, params);
  }

  async getHistoryById(id: number, user: AuthUser): Promise<ReminderHistory> {
    const app = await this.reminderHistoryRepository.userGetById(id, user?.id);
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.reminderHistoryMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async update(input: UpdateReminderDto): Promise<void> {
    const app = await this.getById(input.id);

    Object.assign(app, { ...input });

    await this.reminderRepository.save(app);
  }
}
