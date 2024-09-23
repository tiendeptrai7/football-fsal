"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddlewareModule = void 0;
const logger_http_middleware_1 = require("./http/logger.http.middleware");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
let LoggerMiddlewareModule = class LoggerMiddlewareModule {
    configure(consumer) {
        consumer.apply(logger_http_middleware_1.LoggerHttpMiddleware).forRoutes('*');
    }
};
exports.LoggerMiddlewareModule = LoggerMiddlewareModule;
exports.LoggerMiddlewareModule = LoggerMiddlewareModule = __decorate([
    (0, common_1.Module)({
        providers: [nest_winston_1.WinstonLogger],
    })
], LoggerMiddlewareModule);
//# sourceMappingURL=logger.middleware.module.js.map