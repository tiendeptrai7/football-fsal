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
exports.AuthJwtAccessGuard = void 0;
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
let AuthJwtAccessGuard = class AuthJwtAccessGuard extends (0, passport_1.AuthGuard)('jwt_access') {
    reflector;
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isAnonymousAllowed = this.reflector.get('ANONYMOUS', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        if (isAnonymousAllowed && !token) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err instanceof custom_error_exception_1.default) {
            throw err;
        }
        else if (!user) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', err ? err.message : info?.message);
        }
        return user;
    }
};
exports.AuthJwtAccessGuard = AuthJwtAccessGuard;
exports.AuthJwtAccessGuard = AuthJwtAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthJwtAccessGuard);
//# sourceMappingURL=auth.jwt-access.guard.js.map