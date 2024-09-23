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
var ErrorHttpFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHttpFilter = void 0;
const custom_error_exception_1 = __importDefault(require("../exceptions/custom-error.exception"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ErrorHttpFilter = ErrorHttpFilter_1 = class ErrorHttpFilter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    static handleResponse(response, exception) {
        let responseBody = { message: 'Internal server error' };
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof custom_error_exception_1.default ||
            exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            responseBody = {
                statusCode: statusCode,
                ...JSON.parse(JSON.stringify(exception.getResponse())),
            };
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            responseBody = {
                statusCode: statusCode,
                message: 'Internal server error',
            };
        }
        else if (exception instanceof Error) {
            responseBody = {
                statusCode: statusCode,
                message: 'Internal server error',
            };
        }
        response.status(statusCode).json(responseBody);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        this.handleMessage(exception);
        ErrorHttpFilter_1.handleResponse(response, exception);
    }
    handleMessage(exception) {
        let message = `🔥Internal server error. Message: ${exception.message}.`;
        let context = 'ERROR';
        if (exception instanceof common_1.HttpException ||
            exception instanceof custom_error_exception_1.default) {
            return;
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            message = `🔥 TypeORM query error. Message: ${exception.message}.`;
            context = 'QUERY_FAILED';
        }
        this.logger.error(message, exception.stack, context);
    }
};
exports.ErrorHttpFilter = ErrorHttpFilter;
exports.ErrorHttpFilter = ErrorHttpFilter = ErrorHttpFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_1.Logger])
], ErrorHttpFilter);
//# sourceMappingURL=error.http.filter.js.map