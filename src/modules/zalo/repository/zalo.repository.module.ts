import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ZaloMessage } from './entities/zalo-message.entity';
import { ZaloMessageRepository } from './repositories/zalo-message.repository';

@Module({
  providers: [ZaloMessageRepository],
  exports: [ZaloMessageRepository],
  imports: [TypeOrmModule.forFeature([ZaloMessage])],
})
export class ZaloRepositoryModule {}
