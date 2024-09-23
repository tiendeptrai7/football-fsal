import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs(
  'azureStorage',
  (): Record<string, any> => ({
    containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
    sasConnectionString: process.env.AZURE_STORAGE_SAS_CONNECTION_STRING,
    publicUrl: process.env.AZURE_STORAGE_PUBLIC_URL,
  }),
);
