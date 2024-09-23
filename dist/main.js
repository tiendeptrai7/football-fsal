"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("winston-daily-rotate-file");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const express_loader_1 = __importDefault(require("./loaders/express.loader"));
const swagger_loader_1 = __importDefault(require("./loaders/swagger.loader"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    const configService = app.get(config_1.ConfigService);
    await (0, express_loader_1.default)(app, configService);
    app.useBodyParser('json', { limit: '50mb' });
    app.useBodyParser('urlencoded', { limit: '50mb', extended: true });
    const databaseUri = `${configService.get('database.type')}://${configService.get('database.host')}` +
        `/${configService.get('database.database')}`;
    const port = configService.get('app.http.port');
    const logger = new common_1.Logger();
    const httpEnable = configService.get('app.http.enable');
    const versionEnable = configService.get('app.versioning.enable');
    const jobEnable = configService.get('app.jobEnable');
    await (0, swagger_loader_1.default)(app);
    await app.listen(port);
    logger.log(`==========================================================`);
    logger.log(`Job is ${jobEnable}`, 'NestApplication');
    logger.log(`Http is ${httpEnable}, ${httpEnable ? 'routes registered' : 'no routes registered'}`, 'NestApplication');
    logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');
    logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
    logger.log(`Database uri ${databaseUri}`, 'NestApplication');
    logger.log(`Cors whitelist ${configService.get('request.cors.allowOrigin')}`, 'NestApplication');
    logger.log(`==========================================================`);
}
bootstrap().then();
//# sourceMappingURL=main.js.map