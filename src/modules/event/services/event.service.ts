import { INCREMENT_CODE } from '@app/constant/app.constant';
import { EStatus } from '@app/constant/app.enum';
import { CacheService } from '@common/cache/services/cache.service';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { objOmit, wrapPagination } from '@common/utils/object.util';
import { FilterReminderPublicDto } from '@modules/reminder/dtos/filter-reminder.dto';
import { ReminderRepository } from '@modules/reminder/repository/repositories/reminder.repository';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { CheckInDto, CreateEventDto } from '../dtos/create-event.dto';
import {
  FilterEventDto,
  FilterEventRelatedHcp,
} from '../dtos/filter-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { EventRelatedHCPResponse } from '../interfaces/event-response.interface';
import { Event } from '../repository/entities/event.entity';
import { EventGuest } from '../repository/entities/event-guest.entity';
import { EventRepository } from '../repository/repositories/event.repository';
import { EventGuestRepository } from '../repository/repositories/event-guest.repository';

@Injectable()
export class EventService {
  private newsMessage: MessageService;
  constructor(
    i18nService: I18nService,
    private readonly cacheService: CacheService,
    private readonly eventRepository: EventRepository,
    private readonly reminderRepository: ReminderRepository,
    private readonly eventGuestRepository: EventGuestRepository,
  ) {
    this.newsMessage = new MessageService(i18nService, 'event');
  }
  async getList(params: FilterEventDto): Promise<ListPaginate<Event>> {
    const [data, count] = await this.eventRepository.getList(params);

    return wrapPagination<Event>(data, count, params);
  }

  async getReminderHistoryList(
    params: FilterReminderPublicDto,
    user_id: string,
  ): Promise<[Event[], number]> {
    return await this.eventRepository.getListReminderHistory(params, user_id);
  }

  async getListPublic(params: FilterEventDto): Promise<ListPaginate<Event>> {
    const [data, count] = await this.eventRepository.getList(params, true);

    return wrapPagination<Event>(data, count, params);
  }

  async getById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ['reminders'],
    });

    if (!event) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }
    return event;
  }

  async userGetById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
      select: [
        'id',
        'name',
        'code',
        'content',
        'image_url',
        'is_public',
        'started_at',
        'ended_at',
        'status',
      ],
    });

    if (!event) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }
    return event;
  }

  async create(input: CreateEventDto): Promise<void> {
    const code = await this._getINCRCode();

    const event = await this.eventRepository.save({
      ...input,
      code,
    });

    const reminders = input.reminders.map((reminder) => ({
      ...reminder,
      event_id: event.id,
    }));

    await this.reminderRepository.save(reminders);
  }

  async update(input: UpdateEventDto): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id: input.id },
      relations: ['reminders'],
    });

    if (!event) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }

    this.eventRepository.merge(event, input);

    if (input.reminders) {
      const updatedReminderIds = input.reminders
        .filter((r) => r.id)
        .map((r) => r.id);

      const remindersToRemove = event.reminders.filter(
        (r) => !updatedReminderIds.includes(r.id),
      );
      await this.reminderRepository.remove(remindersToRemove);

      const remindersToUpdate = await Promise.all(
        input.reminders.map(async (reminderDto) => {
          if (reminderDto.id) {
            const existingReminder = event.reminders.find(
              (r) => r.id === reminderDto.id,
            );
            return this.reminderRepository.save(
              this.reminderRepository.merge(existingReminder, reminderDto),
            );
          } else {
            const newReminder = this.reminderRepository.create({
              ...objOmit(reminderDto, ['id']),
              event: event,
            });
            return this.reminderRepository.save(newReminder);
          }
        }),
      );

      event.reminders = remindersToUpdate;
    }

    await this.eventRepository.save(event);
  }

  async toggle(id: number): Promise<void> {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }

    const status = event.status ? EStatus.inactive : EStatus.active;

    await this.eventRepository.update({ id }, { status });
  }

  async togglePublic(id: number): Promise<void> {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.newsMessage.get('NOT_FOUND'),
      );
    }

    const isPublic = event.is_public ? EStatus.inactive : EStatus.active;

    await this.eventRepository.update({ id }, { is_public: isPublic });
  }

  async displayTicketInfo(codeOrId: string | number): Promise<EventGuest> {
    const ticket = await this._findAndValidateTicket(codeOrId);
    return ticket;
  }

  async checkIn(input: CheckInDto): Promise<void> {
    const ticket = await this._findAndValidateTicket(input.qr_code);

    if (ticket.checked_in_at) {
      throw new CustomError(
        400,
        'TICKET_ALREADY_CHECKED_IN',
        this.newsMessage.get('TICKET_ALREADY_CHECKED_IN'),
      );
    }

    await this.eventGuestRepository
      .createQueryBuilder('event_guest')
      .update()
      .set({
        checked_in_at: () => 'GETDATE()',
      })
      .where('event_guest.id = :id', { id: ticket.id })
      .execute();
  }

  async getListEventRelatedHCP(
    params: FilterEventRelatedHcp,
  ): Promise<EventRelatedHCPResponse[]> {
    return await this.eventRepository.getListEventRelatedHCP(params);
  }

  async _getINCRCode(): Promise<string> {
    const getLastCode = async () => {
      const lastRecord = await this.eventRepository.findOne({
        where: {},
        order: {
          id: 'DESC',
        },
      });

      return lastRecord?.code || '';
    };

    const identifier = `${dayjs().format('YYYY_MM')}`;

    return this.cacheService.generateCodeINCR(
      INCREMENT_CODE.EVENT,
      'EV',
      identifier,
      getLastCode,
    );
  }

  private async _findAndValidateTicket(
    codeOrId: string | number,
  ): Promise<EventGuest> {
    const ticket = await this.eventGuestRepository.getTicket(codeOrId);

    if (!ticket) {
      throw new CustomError(
        400,
        'TICKET_NOT_FOUND',
        this.newsMessage.get('TICKET_NOT_FOUND'),
      );
    }
    const { qr_status, event } = ticket;
    if (!event.status) {
      throw new CustomError(
        400,
        'EVENT_INVALID',
        this.newsMessage.get('TICKET_NOT_FOUND'),
      );
    }
    if (!qr_status) {
      throw new CustomError(
        400,
        'TICKET_INVALID',
        this.newsMessage.get('TICKET_INVALID'),
      );
    }
    // if (!is_eligible) {
    //   throw new CustomError(
    //     400,
    //     'TICKET_INELIGIBLE',
    //     this.newsMessage.get('TICKET_INELIGIBLE'),
    //   );
    // }

    return ticket;
  }
}
