import { ZaloTokenService } from '@modules/zalo/services/zalo.token.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RefreshZaloTokenJob {
  constructor(
    private readonly logger: Logger,
    private zaloTokenService: ZaloTokenService,
  ) {}

  @Cron('0 0 * * *')
  handleCron() {
    this.logger.log(`Run refresh token zalo at ${new Date()}`);
    this.zaloTokenService
      .refreshToken()
      .then(() => {
        this.logger.log(`Run refresh token zalo done at ${new Date()}`);
      })
      .catch((error) => {
        this.logger.error(`Run refresh token zalo at ${new Date()}`, error);
      });
  }
}
