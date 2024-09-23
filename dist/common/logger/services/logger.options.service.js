"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerOptionService = void 0;
require("winston-daily-rotate-file");
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const infoAndWarnFilter = winston.format((info) => {
    return info.level === 'info' || info.level === 'warn' ? info : false;
});
const httpFilter = winston.format((info) => {
    return info.level === 'http' ? info : false;
});
const LoggerOptionService = (configService) => {
    const writeIntoFile = configService.get('logger.system.writeIntoFile');
    const writeIntoConsole = configService.get('logger.system.writeIntoConsole');
    const maxSize = configService.get('logger.system.maxSize');
    const maxFiles = configService.get('logger.system.maxFiles');
    const transports = [];
    if (writeIntoFile) {
        transports.push(new winston.transports.DailyRotateFile({
            filename: `%DATE%.log`,
            dirname: `logs/error`,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: maxSize,
            maxFiles: maxFiles,
            level: 'error',
        }));
        transports.push(new winston.transports.DailyRotateFile({
            filename: `%DATE%.log`,
            dirname: `logs/debug`,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: maxSize,
            maxFiles: maxFiles,
            level: 'debug',
        }));
        transports.push(new winston.transports.DailyRotateFile({
            filename: `%DATE%.log`,
            dirname: `logs/http`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: maxSize,
            maxFiles: maxFiles,
            level: 'http',
            format: winston.format.combine(httpFilter()),
        }));
        transports.push(new winston.transports.DailyRotateFile({
            filename: `%DATE%.log`,
            dirname: `logs/default`,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: maxSize,
            maxFiles: maxFiles,
            level: 'info',
            format: winston.format.combine(infoAndWarnFilter()),
        }));
    }
    if (writeIntoConsole) {
        transports.push(new winston.transports.Console({ level: 'debug' }));
    }
    return {
        format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH-MM:ss Z' }), winston.format.errors({ stack: true }), winston.format.splat(), nest_winston_1.utilities.format.nestLike(configService.get('app.name'))),
        transports: [...transports],
        exitOnError: false,
    };
};
exports.LoggerOptionService = LoggerOptionService;
//# sourceMappingURL=logger.options.service.js.map