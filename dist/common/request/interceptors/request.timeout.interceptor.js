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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTimeoutInterceptor = void 0;
const request_constant_1 = require("../constants/request.constant");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let RequestTimeoutInterceptor = class RequestTimeoutInterceptor {
    configService;
    reflector;
    maxTimeoutInMilliSecond;
    constructor(configService, reflector) {
        this.configService = configService;
        this.reflector = reflector;
        this.maxTimeoutInMilliSecond =
            this.configService.get('request.timeout');
    }
    async intercept(context, next) {
        if (context.getType() === 'http') {
            const customTimeout = this.reflector.get(request_constant_1.REQUEST_CUSTOM_TIMEOUT_META_KEY, context.getHandler());
            if (customTimeout) {
                const milliSeconds = this.reflector.get(request_constant_1.REQUEST_CUSTOM_TIMEOUT_VALUE_META_KEY, context.getHandler());
                return next.handle().pipe((0, operators_1.timeout)(milliSeconds), (0, operators_1.catchError)((err) => {
                    if (err instanceof rxjs_1.TimeoutError) {
                        throw new common_1.RequestTimeoutException({
                            statusCode: common_1.HttpStatus.REQUEST_TIMEOUT,
                            errorCode: 'REQUEST_TIMEOUT',
                            message: 'http.clientError.requestTimeOut',
                        });
                    }
                    return (0, rxjs_1.throwError)(() => err);
                }));
            }
            else {
                return next.handle().pipe((0, operators_1.timeout)(this.maxTimeoutInMilliSecond), (0, operators_1.catchError)((err) => {
                    if (err instanceof rxjs_1.TimeoutError) {
                        throw new common_1.RequestTimeoutException({
                            statusCode: common_1.HttpStatus.REQUEST_TIMEOUT,
                            errorCode: 'REQUEST_TIMEOUT',
                            message: 'http.clientError.requestTimeOut',
                        });
                    }
                    return (0, rxjs_1.throwError)(() => err);
                }));
            }
        }
        return next.handle();
    }
};
exports.RequestTimeoutInterceptor = RequestTimeoutInterceptor;
exports.RequestTimeoutInterceptor = RequestTimeoutInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        core_1.Reflector])
], RequestTimeoutInterceptor);
//# sourceMappingURL=request.timeout.interceptor.js.map