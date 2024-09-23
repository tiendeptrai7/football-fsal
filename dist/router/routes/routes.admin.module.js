"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesAdminModule = void 0;
const event_admin_controller_1 = require("../../modules/event/controllers/event.admin.controller");
const event_guest_admin_controller_1 = require("../../modules/event/controllers/event-guest.admin.controller");
const event_module_1 = require("../../modules/event/event.module");
const feedback_admin_controller_1 = require("../../modules/feedback/controllers/feedback.admin.controller");
const feedback_module_1 = require("../../modules/feedback/feedback.module");
const log_admin_controller_1 = require("../../modules/log/controllers/log.admin.controller");
const log_module_1 = require("../../modules/log/log.module");
const news_admin_controller_1 = require("../../modules/news/controllers/news.admin.controller");
const news_module_1 = require("../../modules/news/news.module");
const permission_admin_controller_1 = require("../../modules/permission/controllers/permission.admin.controller");
const permission_module_1 = require("../../modules/permission/permission.module");
const reminder_module_1 = require("../../modules/reminder/reminder.module");
const role_admin_controller_1 = require("../../modules/role/controllers/role.admin.controller");
const role_module_1 = require("../../modules/role/role.module");
const survey_admin_controller_1 = require("../../modules/survey/controllers/survey.admin.controller");
const survey_module_1 = require("../../modules/survey/survey.module");
const system_admin_controller_1 = require("../../modules/system/controllers/system.admin.controller");
const system_module_1 = require("../../modules/system/system.module");
const user_admin_controller_1 = require("../../modules/user/controllers/user.admin.controller");
const user_module_1 = require("../../modules/user/user.module");
const zalo_message_admin_controller_1 = require("../../modules/zalo/controllers/zalo-message.admin.controller");
const zalo_module_1 = require("../../modules/zalo/zalo.module");
const common_1 = require("@nestjs/common");
let RoutesAdminModule = class RoutesAdminModule {
};
exports.RoutesAdminModule = RoutesAdminModule;
exports.RoutesAdminModule = RoutesAdminModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            permission_admin_controller_1.PermissionAdminController,
            role_admin_controller_1.RoleAdminController,
            system_admin_controller_1.SystemAdminController,
            user_admin_controller_1.UserAdminController,
            log_admin_controller_1.LogAdminController,
            news_admin_controller_1.NewsAdminController,
            event_admin_controller_1.EventAdminController,
            event_guest_admin_controller_1.EventGuestAdminController,
            feedback_admin_controller_1.FeedbackAdminController,
            survey_admin_controller_1.SurveyAdminController,
            zalo_message_admin_controller_1.ZaloMessageAdminController,
        ],
        providers: [],
        exports: [],
        imports: [
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            user_module_1.UserModule,
            system_module_1.SystemModule,
            log_module_1.LogModule,
            news_module_1.NewsModule,
            event_module_1.EventModule,
            reminder_module_1.ReminderModule,
            feedback_module_1.FeedbackModule,
            survey_module_1.SurveyModule,
            zalo_module_1.ZaloModule,
        ],
    })
], RoutesAdminModule);
//# sourceMappingURL=routes.admin.module.js.map