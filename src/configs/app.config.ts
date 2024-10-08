import { APP_ENV } from '@app/constant/app.enum';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: process.env.APP_NAME ?? 'NEST JS',
    env: process.env.APP_ENV ? APP_ENV[process.env.APP_ENV] : APP_ENV.DEV,

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
  }),
);
