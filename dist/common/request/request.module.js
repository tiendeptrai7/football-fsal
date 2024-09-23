"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModule = void 0;
const request_date_range_validation_1 = require("./validations/request.date-range.validation");
const request_distinct_array_validation_1 = require("./validations/request.distinct-array.validation");
const request_enum_value_validation_1 = require("./validations/request.enum-value.validation");
const request_greater_than_validation_1 = require("./validations/request.greater-than.validation");
const request_greater_than_equal_to_day_validation_1 = require("./validations/request.greater-than-equal-to-day.validation");
const request_valid_phone_validation_1 = require("./validations/request.valid-phone.validation");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const request_timeout_interceptor_1 = require("./interceptors/request.timeout.interceptor");
const request_middleware_module_1 = require("./middleware/request.middleware.module");
const request_greater_day_validation_1 = require("./validations/request.greater-day.validation");
let RequestModule = class RequestModule {
};
exports.RequestModule = RequestModule;
exports.RequestModule = RequestModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: request_timeout_interceptor_1.RequestTimeoutInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            request_distinct_array_validation_1.IsDistinctArrayConstraint,
            request_valid_phone_validation_1.IsValidPhoneConstraint,
            request_date_range_validation_1.checkDateRangeConstraint,
            request_enum_value_validation_1.IsEnumValueConstraint,
            request_greater_day_validation_1.IsGreaterDayConstraint,
            request_greater_than_equal_to_day_validation_1.IsGreaterThanOrEqualToDayConstraint,
            request_greater_than_validation_1.IsGreaterConstraint,
        ],
        imports: [
            request_middleware_module_1.RequestMiddlewareModule,
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    throttlers: [
                        {
                            ttl: config.get('request.throttle.ttl'),
                            limit: config.get('request.throttle.limit'),
                        },
                    ],
                }),
            }),
        ],
    })
], RequestModule);
//# sourceMappingURL=request.module.js.map