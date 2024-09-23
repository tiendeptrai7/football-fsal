"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const app_constant_1 = require("../../../app/constant/app.constant");
const app_enum_1 = require("../../../app/constant/app.enum");
const cache_service_1 = require("../../../common/cache/services/cache.service");
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const reminder_repository_1 = require("../../reminder/repository/repositories/reminder.repository");
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_i18n_1 = require("nestjs-i18n");
const event_repository_1 = require("../repository/repositories/event.repository");
const event_guest_repository_1 = require("../repository/repositories/event-guest.repository");
let EventService = class EventService {
    cacheService;
    eventRepository;
    reminderRepository;
    eventGuestRepository;
    newsMessage;
    constructor(i18nService, cacheService, eventRepository, reminderRepository, eventGuestRepository) {
        this.cacheService = cacheService;
        this.eventRepository = eventRepository;
        this.reminderRepository = reminderRepository;
        this.eventGuestRepository = eventGuestRepository;
        this.newsMessage = new message_service_1.MessageService(i18nService, 'event');
    }
    async getList(params) {
        const [data, count] = await this.eventRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getReminderHistoryList(params, user_id) {
        return await this.eventRepository.getListReminderHistory(params, user_id);
    }
    async getListPublic(params) {
        const [data, count] = await this.eventRepository.getList(params, true);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getById(id) {
        const event = await this.eventRepository.findOne({
            where: {
                id,
            },
            relations: ['reminders'],
        });
        if (!event) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        return event;
    }
    async userGetById(id) {
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
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        return event;
    }
    async create(input) {
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
    async update(input) {
        const event = await this.eventRepository.findOne({
            where: { id: input.id },
            relations: ['reminders'],
        });
        if (!event) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        this.eventRepository.merge(event, input);
        if (input.reminders) {
            const updatedReminderIds = input.reminders
                .filter((r) => r.id)
                .map((r) => r.id);
            const remindersToRemove = event.reminders.filter((r) => !updatedReminderIds.includes(r.id));
            await this.reminderRepository.remove(remindersToRemove);
            const remindersToUpdate = await Promise.all(input.reminders.map(async (reminderDto) => {
                if (reminderDto.id) {
                    const existingReminder = event.reminders.find((r) => r.id === reminderDto.id);
                    return this.reminderRepository.save(this.reminderRepository.merge(existingReminder, reminderDto));
                }
                else {
                    const newReminder = this.reminderRepository.create({
                        ...(0, object_util_1.objOmit)(reminderDto, ['id']),
                        event: event,
                    });
                    return this.reminderRepository.save(newReminder);
                }
            }));
            event.reminders = remindersToUpdate;
        }
        await this.eventRepository.save(event);
    }
    async toggle(id) {
        const event = await this.eventRepository.findOneBy({ id });
        if (!event) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        const status = event.status ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.eventRepository.update({ id }, { status });
    }
    async togglePublic(id) {
        const event = await this.eventRepository.findOneBy({ id });
        if (!event) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.newsMessage.get('NOT_FOUND'));
        }
        const isPublic = event.is_public ? app_enum_1.EStatus.inactive : app_enum_1.EStatus.active;
        await this.eventRepository.update({ id }, { is_public: isPublic });
    }
    async displayTicketInfo(codeOrId) {
        const ticket = await this._findAndValidateTicket(codeOrId);
        return ticket;
    }
    async checkIn(input) {
        const ticket = await this._findAndValidateTicket(input.qr_code);
        if (ticket.checked_in_at) {
            throw new custom_error_exception_1.default(400, 'TICKET_ALREADY_CHECKED_IN', this.newsMessage.get('TICKET_ALREADY_CHECKED_IN'));
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
    async getListEventRelatedHCP(params) {
        return await this.eventRepository.getListEventRelatedHCP(params);
    }
    async _getINCRCode() {
        const getLastCode = async () => {
            const lastRecord = await this.eventRepository.findOne({
                where: {},
                order: {
                    id: 'DESC',
                },
            });
            return lastRecord?.code || '';
        };
        const identifier = `${(0, dayjs_1.default)().format('YYYY_MM')}`;
        return this.cacheService.generateCodeINCR(app_constant_1.INCREMENT_CODE.EVENT, 'EV', identifier, getLastCode);
    }
    async _findAndValidateTicket(codeOrId) {
        const ticket = await this.eventGuestRepository.getTicket(codeOrId);
        if (!ticket) {
            throw new custom_error_exception_1.default(400, 'TICKET_NOT_FOUND', this.newsMessage.get('TICKET_NOT_FOUND'));
        }
        const { qr_status, event } = ticket;
        if (!event.status) {
            throw new custom_error_exception_1.default(400, 'EVENT_INVALID', this.newsMessage.get('TICKET_NOT_FOUND'));
        }
        if (!qr_status) {
            throw new custom_error_exception_1.default(400, 'TICKET_INVALID', this.newsMessage.get('TICKET_INVALID'));
        }
        return ticket;
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService,
        cache_service_1.CacheService,
        event_repository_1.EventRepository,
        reminder_repository_1.ReminderRepository,
        event_guest_repository_1.EventGuestRepository])
], EventService);
//# sourceMappingURL=event.service.js.map