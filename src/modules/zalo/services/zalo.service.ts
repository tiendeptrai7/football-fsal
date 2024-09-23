import {
  ZALO_GET_OA_POINT,
  ZALO_GET_USER_DETAIL_END_POINT,
} from '@app/constant/zalo.constant';
import { ZaloTokenService } from '@modules/zalo/services/zalo.token.service';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import {
  ZaloOfficialAccountResponse,
  zaloResponse,
  ZaloUserResponse,
} from '../types/zalo.response.type';

@Injectable()
export class ZaloService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
    private readonly zaloTokenService: ZaloTokenService,
  ) {}

  async getUserDetail(
    zaloID: string,
    isRetry?: boolean,
  ): Promise<ZaloUserResponse> {
    const response = await lastValueFrom(
      this.httpService.get<any>(ZALO_GET_USER_DETAIL_END_POINT, {
        headers: {
          'content-type': 'application/json',
          access_token: await this.zaloTokenService.getAccessToken(),
        },
        params: {
          data: `{"user_id":${zaloID}}`,
        },
      }),
    );

    const responseData = response.data;

    if (responseData.error !== 0) {
      if (!isRetry) {
        return null;
      }

      const retryErrorCodes = [-216, -124];

      if (retryErrorCodes.includes(responseData.error)) {
        await this.zaloTokenService.refreshToken();
        await this.getUserDetail(zaloID);
      }
    }

    return {
      user_id: responseData?.data?.user_id,
      user_id_by_app: responseData?.data?.user_id_by_app,
      display_name: responseData?.data?.display_name,
      user_alias: responseData?.data?.user_alias,
      user_is_follower: responseData?.data?.user_is_follower,
      user_last_interaction_date:
        responseData?.data?.user_last_interaction_date,
      avatar: response?.data?.avatar,
    };
  }

  async getOa(isRetry?: boolean): Promise<ZaloOfficialAccountResponse> {
    const response = await lastValueFrom(
      this.httpService.get<zaloResponse<ZaloOfficialAccountResponse>>(
        ZALO_GET_OA_POINT,
        {
          headers: {
            'content-type': 'application/json',
            access_token: await this.zaloTokenService.getAccessToken(),
          },
        },
      ),
    );

    const responseData = response.data;

    if (responseData.error !== 0) {
      if (!isRetry) {
        return null;
      }

      const retryErrorCodes = [-216, -124];

      if (retryErrorCodes.includes(responseData.error)) {
        await this.zaloTokenService.refreshToken();
        await this.getOa();
      }
    }

    return responseData?.data;
  }
}
