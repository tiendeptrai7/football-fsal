import { Global, Module } from '@nestjs/common';

import { AzureStorageService } from './services/azure-storage.service';

@Global()
@Module({
  providers: [AzureStorageService],
  exports: [AzureStorageService],
})
export class AzureStorageModule {}
