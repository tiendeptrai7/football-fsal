import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const options = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.DATABASE_SYNC === 'true' ?? false,
  logging: process.env.DATABASE_DEBUG === 'true' ?? false,
  entities: [
    'dist/modules/**/*.entity{.ts,.js}',
    'dist/auth/**/*.entity{.ts,.js}',
  ],
  migrations: [join(__dirname, '../common/database/migrations/', '*.{ts,js}')],
  autoLoadEntities: true,
  ssl: true,
  timezone: 'Z',
  seeding: process.env.DATABASE_SEEDING === 'true' ?? false,
  // schema: process.env.DATABASE_SCHEMA,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

export default registerAs(
  'database',
  (): Record<string, any> => ({ ...options }),
);
export const connectionSource = new DataSource(options as DataSourceOptions);
