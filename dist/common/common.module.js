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
exports.CommonModule = void 0;
const excel_module_1 = require("./excel/excel.module");
const queue_module_1 = require("./queue/queue.module");
const s3_module_1 = require("./s3/s3.module");
const index_1 = __importDefault(require("../configs/index"));
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const azure_storage_module_1 = require("./azure-storage/azure-storage.module");
const cache_config_module_1 = require("./cache/cache.config.module");
const database_module_1 = require("./database/database.module");
const error_module_1 = require("./error/error.module");
const jobs_module_1 = require("./jobs/jobs.module");
const logger_module_1 = require("./logger/logger.module");
const message_module_1 = require("./message/message.module");
const request_module_1 = require("./request/request.module");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                load: index_1.default,
                isGlobal: true,
                cache: true,
                envFilePath: ['.env'],
                expandVariables: true,
            }),
            logger_module_1.LoggerModule,
            database_module_1.DatabaseModule,
            error_module_1.ErrorModule,
            request_module_1.RequestModule,
            jobs_module_1.JobsModule.forRoot(),
            message_module_1.MessageModule,
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            cache_config_module_1.CacheConfigModule,
            queue_module_1.QueueConfigModule,
            excel_module_1.ExcelModule,
            s3_module_1.S3Module,
            azure_storage_module_1.AzureStorageModule,
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map