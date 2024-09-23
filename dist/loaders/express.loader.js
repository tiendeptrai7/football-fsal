"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("../app/app.module");
const custom_error_exception_1 = __importDefault(require("../common/error/exceptions/custom-error.exception"));
const message_service_1 = require("../common/message/services/message.service");
const string_util_1 = require("../common/utils/string.util");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const helmet_1 = __importDefault(require("helmet"));
const nestjs_i18n_1 = require("nestjs-i18n");
exports.default = async (app, configService) => {
    process.env.NODE_ENV = configService.get('app.env');
    const i18nService = app.get(nestjs_i18n_1.I18nService);
    const validateMessage = new message_service_1.MessageService(i18nService, 'validate');
    const versionEnable = configService.get('app.versioning.enable');
    app.setGlobalPrefix(configService.get('app.globalPrefix'), {
        exclude: [
            {
                path: '/media/video/:key',
                method: common_1.RequestMethod.GET,
            },
            {
                path: '/media/upload/single/:type',
                method: common_1.RequestMethod.POST,
            },
            {
                path: '/media/upload/multiple/:type',
                method: common_1.RequestMethod.POST,
            },
        ],
    });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        transform: true,
        exceptionFactory: (validationErrors = []) => {
            let error = validationErrors[0];
            while (error?.children?.length) {
                error = error.children[0];
            }
            return new custom_error_exception_1.default(400, 'BAD_REQUEST', (0, string_util_1.capitalizeText)(validateMessage.get('VALIDATE.' + Object.keys(error.constraints)[0].toUpperCase(), 'validate', {
                field: validateMessage.get('FIELD.' + error.property.toUpperCase()),
                value: Object.values(error.constraints)[0],
            })));
        },
    }));
    if (versionEnable) {
        app.enableVersioning({
            type: common_1.VersioningType.URI,
            defaultVersion: configService.get('app.versioning.version'),
            prefix: configService.get('app.versioning.prefix'),
        });
    }
    app.enableCors({
        origin: configService.get('request.cors.allowOrigin'),
        methods: configService.get('request.cors.allowMethod'),
        preflightContinue: false,
        credentials: true,
        optionsSuccessStatus: common_1.HttpStatus.NO_CONTENT,
    });
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: false,
    }));
};
//# sourceMappingURL=express.loader.js.map