import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


const options = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.DATABASE_SYNC === 'true',
  logging: process.env.DATABASE_DEBUG === 'true',
  entities: [
    'dist/modules/**/*.entity{.ts,.js}',
    'dist/auth/**/*.entity{.ts,.js}',
  ],
  migrations: [join(__dirname, '../common/database/migrations/', '*.{ts,js}')],
  autoLoadEntities: true,
  ssl: true,
  timezone: 'Z',
  seeding: process.env.DATABASE_SEEDING === 'true',
  // schema: process.env.DATABASE_SCHEMA,
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs(
  'database',
  (): Record<string, any> => ({ ...options }),
);
export const connectionSource = new DataSource(options as DataSourceOptions);
