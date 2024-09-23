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
exports.ReminderService = void 0;
const custom_error_exception_1 = __importDefault(require("../../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../../common/message/services/message.service");
const object_util_1 = require("../../../common/utils/object.util");
const event_service_1 = require("../../event/services/event.service");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const reminder_repository_1 = require("../repository/repositories/reminder.repository");
const reminder_history_repository_1 = require("../repository/repositories/reminder-history.repository");
let ReminderService = class ReminderService {
    reminderRepository;
    reminderHistoryRepository;
    eventService;
    reminderMessage;
    reminderHistoryMessage;
    constructor(reminderRepository, reminderHistoryRepository, eventService, i18nService) {
        this.reminderRepository = reminderRepository;
        this.reminderHistoryRepository = reminderHistoryRepository;
        this.eventService = eventService;
        this.reminderMessage = new message_service_1.MessageService(i18nService, 'reminder');
        this.reminderHistoryMessage = new message_service_1.MessageService(i18nService, 'reminder-history');
    }
    async create(input) {
        await this.reminderRepository.save(input);
    }
    async getById(id) {
        const app = await this.reminderRepository.findOneBy({ id });
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.reminderMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async getList(params) {
        const [data, count] = await this.reminderRepository.getList(params);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getHistoryList(params, user) {
        const [data, count] = await this.eventService.getReminderHistoryList(params, user?.id);
        return (0, object_util_1.wrapPagination)(data, count, params);
    }
    async getHistoryById(id, user) {
        const app = await this.reminderHistoryRepository.userGetById(id, user?.id);
        if (!app) {
            throw new custom_error_exception_1.default(404, 'NOT_FOUND', this.reminderHistoryMessage.get('NOT_FOUND'));
        }
        return app;
    }
    async update(input) {
        const app = await this.getById(input.id);
        Object.assign(app, { ...input });
        await this.reminderRepository.save(app);
    }
};
exports.ReminderService = ReminderService;
exports.ReminderService = ReminderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reminder_repository_1.ReminderRepository,
        reminder_history_repository_1.ReminderHistoryRepository,
        event_service_1.EventService,
        nestjs_i18n_1.I18nService])
], ReminderService);
//# sourceMappingURL=reminder.service.js.map