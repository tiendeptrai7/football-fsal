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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerHttpResponseMiddleware = exports.LoggerHttpWriteIntoConsoleMiddleware = exports.LoggerHttpWriteIntoFileMiddleware = exports.LoggerHttpMiddleware = void 0;
const logger_constant_1 = require("../../constants/logger.constant");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dayjs_1 = __importDefault(require("dayjs"));
const morgan_1 = __importDefault(require("morgan"));
const nest_winston_1 = require("nest-winston");
const rotating_file_stream_1 = require("rotating-file-stream");
const winston_1 = require("winston");
let LoggerHttpMiddleware = class LoggerHttpMiddleware {
    configService;
    logger;
    writeIntoFile;
    writeIntoConsole;
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.writeIntoFile = this.configService.get('logger.http.writeIntoFile');
        this.writeIntoConsole = this.configService.get('logger.http.writeIntoConsole');
    }
    createStream() {
        return {
            write: (message) => {
                if (this.writeIntoConsole) {
                    this.logger.http(message, { context: 'HTTP' });
                }
            },
        };
    }
    async use(req, res, next) {
        if (this.writeIntoConsole || this.writeIntoFile) {
            const stream = this.createStream();
            (0, morgan_1.default)('combined', { stream })(req, res, next);
        }
        else {
            next();
        }
    }
};
exports.LoggerHttpMiddleware = LoggerHttpMiddleware;
exports.LoggerHttpMiddleware = LoggerHttpMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        winston_1.Logger])
], LoggerHttpMiddleware);
let LoggerHttpWriteIntoFileMiddleware = class LoggerHttpWriteIntoFileMiddleware {
    configService;
    writeIntoFile;
    maxSize;
    maxFiles;
    constructor(configService) {
        this.configService = configService;
        this.writeIntoFile = this.configService.get('logger.http.writeIntoFile');
        this.maxSize = this.configService.get('logger.http.maxSize');
        this.maxFiles = this.configService.get('logger.http.maxFiles');
    }
    httpLogger() {
        const date = (0, dayjs_1.default)().format('YYYY-MM-DD');
        const loggerHttpOptions = {
            stream: (0, rotating_file_stream_1.createStream)(`${date}.log`, {
                path: `./logs/http/`,
                maxSize: this.maxSize,
                maxFiles: this.maxFiles,
                compress: true,
                interval: '1d',
            }),
        };
        return {
            loggerHttpFormat: logger_constant_1.LOGGER_HTTP_FORMAT,
            loggerHttpOptions,
        };
    }
    async use(req, res, next) {
        if (this.writeIntoFile) {
            const config = this.httpLogger();
            (0, morgan_1.default)(config.loggerHttpFormat, config.loggerHttpOptions)(req, res, next);
        }
        else {
            next();
        }
    }
};
exports.LoggerHttpWriteIntoFileMiddleware = LoggerHttpWriteIntoFileMiddleware;
exports.LoggerHttpWriteIntoFileMiddleware = LoggerHttpWriteIntoFileMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerHttpWriteIntoFileMiddleware);
let LoggerHttpWriteIntoConsoleMiddleware = class LoggerHttpWriteIntoConsoleMiddleware {
    configService;
    writeIntoConsole;
    constructor(configService) {
        this.configService = configService;
        this.writeIntoConsole = this.configService.get('logger.http.writeIntoConsole');
    }
    async httpLogger() {
        return {
            loggerHttpFormat: logger_constant_1.LOGGER_HTTP_FORMAT,
        };
    }
    async use(req, res, next) {
        if (this.writeIntoConsole) {
            const config = await this.httpLogger();
            (0, morgan_1.default)(config.loggerHttpFormat)(req, res, next);
        }
        else {
            next();
        }
    }
};
exports.LoggerHttpWriteIntoConsoleMiddleware = LoggerHttpWriteIntoConsoleMiddleware;
exports.LoggerHttpWriteIntoConsoleMiddleware = LoggerHttpWriteIntoConsoleMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerHttpWriteIntoConsoleMiddleware);
let LoggerHttpResponseMiddleware = class LoggerHttpResponseMiddleware {
    configService;
    writeIntoFile;
    writeIntoConsole;
    constructor(configService) {
        this.configService = configService;
        this.writeIntoConsole = this.configService.get('logger.http.writeIntoConsole');
        this.writeIntoFile = this.configService.get('logger.http.writeIntoFile');
    }
    use(req, res, next) {
        if (this.writeIntoConsole || this.writeIntoFile) {
            const send = res.send;
            const resOld = res;
            resOld.send = (body) => {
                resOld.body = body;
                resOld.send = send;
                resOld.send(body);
                res = resOld;
            };
        }
        next();
    }
};
exports.LoggerHttpResponseMiddleware = LoggerHttpResponseMiddleware;
exports.LoggerHttpResponseMiddleware = LoggerHttpResponseMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerHttpResponseMiddleware);
//# sourceMappingURL=logger.http.middleware.js.map