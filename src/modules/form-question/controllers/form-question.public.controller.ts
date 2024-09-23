import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FilterFormQuestionDto } from '../dtos/filter-form-question.dto';
import { FormQuestion } from '../repository/entities/form-question.entity';
import { FormQuestionService } from '../services/form-question.service';

@Controller('form-questions')
@ApiTags('Form-question')
export class FormQuestionPublicController {
  constructor(private readonly service: FormQuestionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() param: FilterFormQuestionDto,
  ): Promise<ListPaginate<FormQuestion>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number): Promise<FormQuestion> {
    return await this.service.getById(id);
  }
}
