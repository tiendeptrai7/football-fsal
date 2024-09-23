"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("./app.config"));
const auth_config_1 = __importDefault(require("./auth.config"));
const azure_storage_config_1 = __importDefault(require("./azure-storage.config"));
const cache_config_1 = __importDefault(require("./cache.config"));
const database_config_1 = __importDefault(require("./database.config"));
const logger_config_1 = __importDefault(require("./logger.config"));
const notify_config_1 = __importDefault(require("./notify.config"));
const request_config_1 = __importDefault(require("./request.config"));
const s3_config_1 = __importDefault(require("./s3.config"));
exports.default = [
    app_config_1.default,
    database_config_1.default,
    logger_config_1.default,
    request_config_1.default,
    auth_config_1.default,
    cache_config_1.default,
    notify_config_1.default,
    s3_config_1.default,
    azure_storage_config_1.default,
];
//# sourceMappingURL=index.js.map