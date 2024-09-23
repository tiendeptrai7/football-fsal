"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('logger', () => ({
    http: {
        writeIntoFile: process.env.LOGGER_HTTP_WRITE_INTO_FILE === 'true',
        writeIntoConsole: process.env.LOGGER_HTTP_WRITE_INTO_CONSOLE === 'true',
        maxFiles: 5,
        maxSize: '2M',
    },
    system: {
        writeIntoFile: process.env.LOGGER_SYSTEM_WRITE_INTO_FILE === 'true',
        writeIntoConsole: process.env.LOGGER_SYSTEM_WRITE_INTO_CONSOLE === 'true',
        maxFiles: '7d',
        maxSize: '2m',
    },
}));
//# sourceMappingURL=logger.config.js.map