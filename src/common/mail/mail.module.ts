import { MailService } from '@common/mail/services/mail.service';
import { SystemRepositoryModule } from '@modules/system/repository/system.repository.module';
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: process.env.REDIS_MAIL_QUEUE_NAME,
    }),
    SystemRepositoryModule,
  ],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
