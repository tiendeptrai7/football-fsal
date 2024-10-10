import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsService } from '../services/news.service';
import { ScorersResponseDto } from '../dtos/top-scorer.dto';

@Controller('top-scorer')
@ApiTags('Top scorer management')
export class TopScorerPublicController {
  constructor(private readonly service: NewsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<ScorersResponseDto> {
    return await this.service.getScorers();
  }
}
