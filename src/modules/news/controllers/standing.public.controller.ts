import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsService } from '../services/news.service';
import { FootballStandingsDto } from '../dtos/standing.dto';

@Controller('standing')
@ApiTags('standing management')
export class StandingPublicController {
  constructor(private readonly service: NewsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<FootballStandingsDto> {
    return await this.service.getStanding();
  }

}
