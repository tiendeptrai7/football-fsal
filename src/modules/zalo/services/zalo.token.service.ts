import { ZALO_TOKEN_END_POINT } from '@app/constant/zalo.constant';
import { UpdateSystemDto } from '@modules/system/dtos/update-system.dto';
import { SystemService } from '@modules/system/services/system.service';
import { ZaloTokenResponse } from '@modules/zalo/types/zalo.token.type';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ZaloTokenService {
  constructor(
    private readonly logger: Logger,
    private readonly systemService: SystemService,
    private readonly httpService: HttpService,
  ) {}

  async getAccessToken(): Promise<string> {
    const token = await this.systemService.getValueByKey(
      'ZALO_OA_ACCESS_TOKEN',
      true,
    );

    if (!token) {
      return await this.refreshToken();
    }

    return token;
  }

  async refreshToken(): Promise<string> {
    try {
      const [refreshToken, appId, secretKey] = await Promise.all([
        await this.systemService.getValueByKey('ZALO_OA_REFRESH_TOKEN'),
        await this.systemService.getValueByKey('ZALO_APP_ID'),
        await this.systemService.getValueByKey('ZALO_APP_SECRET_KEY'),
      ]);

      const { data } = await lastValueFrom(
        this.httpService.post<ZaloTokenResponse>(
          ZALO_TOKEN_END_POINT,
          {
            refresh_token: refreshToken,
            app_id: appId,
            grant_type: 'refresh_token',
          },
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              secret_key: secretKey,
            },
          },
        ),
      );
      if (data?.access_token && data?.refresh_token) {
        await Promise.all([
          this.systemService.update({
            key: 'ZALO_OA_ACCESS_TOKEN',
            value: data.access_token,
          } as UpdateSystemDto),
          this.systemService.update({
            key: 'ZALO_OA_REFRESH_TOKEN',
            value: data.refresh_token,
          } as UpdateSystemDto),
        ]);
      }

      return data.access_token;
    } catch (e) {
      this.logger.error(
        'Error when refresh token zalo',
        e,
        'ZaloTokenService.refreshToken',
      );
    }
  }
}
