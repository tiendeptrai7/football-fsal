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
exports.AuthScopeGuard = void 0;
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../../common/message/services/message.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_i18n_1 = require("nestjs-i18n");
let AuthScopeGuard = class AuthScopeGuard {
    reflector;
    authMessage;
    constructor(reflector, i18nService) {
        this.reflector = reflector;
        this.authMessage = new message_service_1.MessageService(i18nService, 'auth');
    }
    async canActivate(context) {
        const isAnonymousAllowed = this.reflector.get('ANONYMOUS', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (isAnonymousAllowed && !user) {
            return true;
        }
        const requiredFor = this.reflector.getAllAndOverride('SCOPE', [context.getHandler(), context.getClass()]);
        if (requiredFor) {
            const { user } = context.switchToHttp().getRequest();
            if (user.scope !== requiredFor) {
                throw new custom_error_exception_1.default(403, 'FORBIDDEN', this.authMessage.get('FORBIDDEN'));
            }
        }
        return true;
    }
};
exports.AuthScopeGuard = AuthScopeGuard;
exports.AuthScopeGuard = AuthScopeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        nestjs_i18n_1.I18nService])
], AuthScopeGuard);
//# sourceMappingURL=auth.scope.guard.js.map