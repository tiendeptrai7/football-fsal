import { SystemModule } from '@modules/system/system.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ZaloRepositoryModule } from './repository/zalo.repository.module';
import { ZaloHookService } from './services/zalo.hook.service';
import { ZaloService } from './services/zalo.service';
import { ZaloTokenService } from './services/zalo.token.service';
import { ZaloMessageService } from './services/zalo-message.service';

@Module({
  imports: [ZaloRepositoryModule, SystemModule, HttpModule],
  exports: [ZaloHookService, ZaloTokenService, ZaloService, ZaloMessageService],
  providers: [
    ZaloHookService,
    ZaloTokenService,
    ZaloService,
    ZaloMessageService,
  ],
  controllers: [],
})
export class ZaloModule {}
