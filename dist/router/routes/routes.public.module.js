"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesPublicModule = void 0;
const event_public_controller_1 = require("../../modules/event/controllers/event.public.controller");
const event_guest_public_controller_1 = require("../../modules/event/controllers/event-guest.public.controller");
const event_module_1 = require("../../modules/event/event.module");
const feedback_public_controller_1 = require("../../modules/feedback/controllers/feedback.public.controller");
const feedback_module_1 = require("../../modules/feedback/feedback.module");
const news_public_controller_1 = require("../../modules/news/controllers/news.public.controller");
const news_module_1 = require("../../modules/news/news.module");
const permission_module_1 = require("../../modules/permission/permission.module");
const reminder_public_controller_1 = require("../../modules/reminder/controllers/reminder.public.controller");
const reminder_module_1 = require("../../modules/reminder/reminder.module");
const survey_public_controller_1 = require("../../modules/survey/controllers/survey.public.controller");
const survey_module_1 = require("../../modules/survey/survey.module");
const system_public_controller_1 = require("../../modules/system/controllers/system.public.controller");
const system_module_1 = require("../../modules/system/system.module");
const user_public_controller_1 = require("../../modules/user/controllers/user.public.controller");
const user_module_1 = require("../../modules/user/user.module");
const zalo_hook_public_controller_1 = require("../../modules/zalo/controllers/zalo-hook.public.controller");
const zalo_module_1 = require("../../modules/zalo/zalo.module");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const health_public_controller_1 = require("../../health/controllers/health.public.controller");
let RoutesPublicModule = class RoutesPublicModule {
};
exports.RoutesPublicModule = RoutesPublicModule;
exports.RoutesPublicModule = RoutesPublicModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            health_public_controller_1.HealthPublicController,
            system_public_controller_1.SystemPublicController,
            user_public_controller_1.UserPublicController,
            feedback_public_controller_1.FeedbackPublicController,
            news_public_controller_1.NewsPublicController,
            event_public_controller_1.EventPublicController,
            event_guest_public_controller_1.EventGuestPublicController,
            reminder_public_controller_1.ReminderPublicController,
            survey_public_controller_1.SurveyPublicController,
            zalo_hook_public_controller_1.ZaloHookPublicController,
        ],
        providers: [],
        exports: [],
        imports: [
            terminus_1.TerminusModule,
            system_module_1.SystemModule,
            user_module_1.UserModule,
            permission_module_1.PermissionModule,
            reminder_module_1.ReminderModule,
            feedback_module_1.FeedbackModule,
            news_module_1.NewsModule,
            survey_module_1.SurveyModule,
            event_module_1.EventModule,
            zalo_module_1.ZaloModule,
        ],
    })
], RoutesPublicModule);
//# sourceMappingURL=routes.public.module.js.map