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
const app_enum_1 = require("../app/constant/app.enum");
const config_1 = require("@nestjs/config");
const process = __importStar(require("process"));
exports.default = (0, config_1.registerAs)('app', () => ({
    name: process.env.APP_NAME ?? 'NEST JS',
    env: process.env.APP_ENV ? app_enum_1.APP_ENV[process.env.APP_ENV] : app_enum_1.APP_ENV.DEV,
    repoVersion: process.env.APP_VER,
    versioning: {
        enable: process.env.HTTP_VERSIONING_ENABLE === 'true' ?? false,
        prefix: 'v',
        version: process.env.HTTP_VERSION ?? '1',
    },
    globalPrefix: '/api',
    http: {
        enable: process.env.HTTP_ENABLE === 'true' ?? false,
        host: process.env.HTTP_HOST ?? 'localhost',
        port: process.env.HTTP_PORT ? +process.env.HTTP_PORT : 3000,
    },
    jobEnable: process.env.JOB_ENABLE === 'true' ?? false,
    defaultLanguage: process.env.APP_DEFAULT_LANGUAGE?.toLowerCase() ?? 'en',
    adminUrl: process.env.APP_ADMIN_URL,
}));
//# sourceMappingURL=app.config.js.map