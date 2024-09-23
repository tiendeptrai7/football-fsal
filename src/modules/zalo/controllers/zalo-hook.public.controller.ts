import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { SignatureGuard } from '../guards/signature.guard';
import { ZaloHookService } from '../services/zalo.hook.service';
import { ZaloHookPayload } from '../types/zalo.type';

@Controller('zalo')
@ApiTags('Zalo')
export class ZaloHookPublicController {
  constructor(private readonly service: ZaloHookService) {}
  @Post('hook')
  @UseGuards(SignatureGuard)
  @HttpCode(200)
  zaloHook(@Body() body: ZaloHookPayload): void {
    this.service.processZaloHook(body).then();
  }

  @Get('hook/zalo_verifierEVAY6SE48Hy5cQGMmkv_A1hVxJ3sgJrjCJOs.html')
  zaloVerify(@Res() res: Response) {
    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta name="zalo-platform-site-verification" content="EVAY6SE48Hy5cQGMmkv_A1hVxJ3sgJrjCJOs" />
    </head>
    <body>
    There Is No Limit To What You Can Accomplish Using Zalo!
    </body>
    </html>
    `);
  }
}
