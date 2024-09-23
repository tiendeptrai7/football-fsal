import { ZaloModule } from '@modules/zalo/zalo.module';
import { Module } from '@nestjs/common';

import { RefreshZaloTokenJob } from './zalo/refresh-token.job';

@Module({
  providers: [RefreshZaloTokenJob],
  exports: [RefreshZaloTokenJob],
  imports: [ZaloModule],
  controllers: [],
})
export class JobsRouterModule {}
