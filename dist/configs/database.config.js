"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
require("dotenv/config");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const options = {
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC === 'true' ?? false,
    logging: process.env.DATABASE_DEBUG === 'true' ?? false,
    entities: [
        'dist/modules/**/*.entity{.ts,.js}',
        'dist/auth/**/*.entity{.ts,.js}',
    ],
    migrations: [(0, path_1.join)(__dirname, '../common/database/migrations/', '*.{ts,js}')],
    autoLoadEntities: true,
    timezone: 'Z',
    seeding: process.env.DATABASE_SEEDING === 'true' ?? false,
    options: {
        encrypt: false,
        trustServerCertificate: false,
    },
};
exports.default = (0, config_1.registerAs)('database', () => ({ ...options }));
exports.connectionSource = new typeorm_1.DataSource(options);
//# sourceMappingURL=database.config.js.map