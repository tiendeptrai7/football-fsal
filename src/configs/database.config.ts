import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { url } from 'inspector';

const options = {
  type: 'postgres',
  url: 'postgresql://football_fsal_dev_user:VUO6h4MhDMiPhJbZfdft7g8VZzl7WpVs@dpg-crognl1u0jms73c9535g-a.oregon-postgres.render.com/football_fsal_dev',
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
