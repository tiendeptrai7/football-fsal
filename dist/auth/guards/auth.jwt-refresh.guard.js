"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtRefreshGuard = void 0;
const custom_error_exception_1 = __importDefault(require("../../common/error/exceptions/custom-error.exception"));
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let AuthJwtRefreshGuard = class AuthJwtRefreshGuard extends (0, passport_1.AuthGuard)('jwt_refresh') {
    handleRequest(err, user, info) {
        if (err instanceof custom_error_exception_1.default) {
            throw err;
        }
        else if (!user) {
            throw new custom_error_exception_1.default(common_1.HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', err ? err.message : info.message);
        }
        return user;
    }
};
exports.AuthJwtRefreshGuard = AuthJwtRefreshGuard;
exports.AuthJwtRefreshGuard = AuthJwtRefreshGuard = __decorate([
    (0, common_1.Injectable)()
], AuthJwtRefreshGuard);
//# sourceMappingURL=auth.jwt-refresh.guard.js.map