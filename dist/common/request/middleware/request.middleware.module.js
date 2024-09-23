"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMiddlewareModule = void 0;
const request_body_parser_middleware_1 = require("./body-parser/request.body-parser.middleware");
const request_id_middleware_1 = require("./id/request.id.middleware");
const request_timestamp_middleware_1 = require("./timestamp/request.timestamp.middleware");
const request_timezone_middleware_1 = require("./timezone/request.timezone.middleware");
const request_user_agent_middleware_1 = require("./user-agent/request.user-agent.middleware");
const request_version_middleware_1 = require("./version/request.version.middleware");
const common_1 = require("@nestjs/common");
let RequestMiddlewareModule = class RequestMiddlewareModule {
    configure(consumer) {
        consumer
            .apply(request_id_middleware_1.RequestIdMiddleware, request_body_parser_middleware_1.RequestJsonBodyParserMiddleware, request_body_parser_middleware_1.RequestTextBodyParserMiddleware, request_body_parser_middleware_1.RequestRawBodyParserMiddleware, request_body_parser_middleware_1.RequestUrlencodedBodyParserMiddleware, request_version_middleware_1.RequestVersionMiddleware, request_user_agent_middleware_1.RequestUserAgentMiddleware, request_timestamp_middleware_1.RequestTimestampMiddleware, request_timezone_middleware_1.RequestTimezoneMiddleware)
            .forRoutes('*');
    }
};
exports.RequestMiddlewareModule = RequestMiddlewareModule;
exports.RequestMiddlewareModule = RequestMiddlewareModule = __decorate([
    (0, common_1.Module)({})
], RequestMiddlewareModule);
//# sourceMappingURL=request.middleware.module.js.map