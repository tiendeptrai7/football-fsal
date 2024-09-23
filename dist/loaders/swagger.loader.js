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
const process = __importStar(require("node:process"));
const app_enum_1 = require("../app/constant/app.enum");
const swagger_1 = require("@nestjs/swagger");
const routes_organizer_module_1 = require("../router/routes/routes.organizer.module");
const routes_admin_module_1 = require("../router/routes/routes.admin.module");
const routes_public_module_1 = require("../router/routes/routes.public.module");
const APP_NAME = process.env.APP_NAME || 'NESTJS';
const swaggerLoader = async (app) => {
    if (process.env.NODE_ENV !== app_enum_1.APP_ENV.DEV)
        return;
    const configAdmin = new swagger_1.DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`${APP_NAME}'s Admin API description`)
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refreshToken')
        .build();
    const optionAdmin = {
        include: [routes_admin_module_1.RoutesAdminModule],
        deepScanRoutes: true,
    };
    const documentAdmin = swagger_1.SwaggerModule.createDocument(app, configAdmin, optionAdmin);
    swagger_1.SwaggerModule.setup('docs/admin', app, documentAdmin);
    const configPublic = new swagger_1.DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`${APP_NAME}'s Public API description`)
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refreshToken')
        .addGlobalParameters({
        in: 'header',
        required: true,
        name: 'locale',
        schema: {
            example: 'vi',
        },
    })
        .build();
    const optionPublic = {
        include: [routes_public_module_1.RoutesPublicModule],
        deepScanRoutes: true,
    };
    const documentPublic = swagger_1.SwaggerModule.createDocument(app, configPublic, optionPublic);
    swagger_1.SwaggerModule.setup('docs', app, documentPublic, {
        swaggerOptions: { persistAuthorization: true },
    });
    const configOrganizer = new swagger_1.DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`${APP_NAME}'s Organizer API description`)
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refreshToken')
        .addGlobalParameters({
        in: 'header',
        required: true,
        name: 'locale',
        schema: {
            example: 'vi',
        },
    })
        .build();
    const optionOrganizer = {
        include: [routes_organizer_module_1.RoutesOrganizerModule],
        deepScanRoutes: true,
    };
    const documentOrganizer = swagger_1.SwaggerModule.createDocument(app, configOrganizer, optionOrganizer);
    swagger_1.SwaggerModule.setup('docs/organizer', app, documentOrganizer, {
        swaggerOptions: { persistAuthorization: true },
    });
};
exports.default = swaggerLoader;
//# sourceMappingURL=swagger.loader.js.map