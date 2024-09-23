import { SystemService } from '@modules/system/services/system.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';

@Injectable()
export class SignatureGuard implements CanActivate {
  constructor(
    configService: ConfigService,
    private readonly systemService: SystemService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers, body } = context.switchToHttp().getRequest();
    const [appId, oaSecretKey] = await Promise.all([
      this.systemService.getValueByKey('ZALO_APP_ID'),
      this.systemService.getValueByKey('ZALO_WEBHOOK_OA_SECRET_KEY'),
    ]);

    if (!appId || !oaSecretKey) {
      return false;
    }

    const rawVerify =
      appId + JSON.stringify(body) + body.timestamp + oaSecretKey;

    const signature = headers['x-zevent-signature'];

    if (!signature) {
      return false;
    }

    const hash = `mac=${crypto
      .createHash('sha256')
      .update(rawVerify)
      .digest('hex')}`;

    return hash === signature;
  }
}
