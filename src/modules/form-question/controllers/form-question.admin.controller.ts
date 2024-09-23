import { Auth } from '@auth/decorators/auth.jwt.decorator';
import { ListPaginate } from '@common/database/types/database.type';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FilterFormQuestionDto } from '../dtos/filter-form-question.dto';
import { FormQuestion } from '../repository/entities/form-question.entity';
import { FormQuestionService } from '../services/form-question.service';

@Controller('form-questions')
@ApiTags('Form-Question')
@ApiBearerAuth('accessToken')
export class FormQuestionAdminController {
  constructor(private readonly service: FormQuestionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'form-question_manage_read' })
  async getList(
    @Query() param: FilterFormQuestionDto,
  ): Promise<ListPaginate<FormQuestion>> {
    return await this.service.getList(param);
  }

  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  @Auth({ permissions: 'form-question_manage_read' })
  async getById(@Param('id') id: number): Promise<FormQuestion> {
    return await this.service.getById(id);
  }

  //   @Put()
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   @Auth({ permissions: 'form-question_manage_update' })
  //   async update(@Body() body: UpdateFormQuestionDto): Promise<void> {
  //     return await this.service.update(body);
  //   }

  @Delete(':id([0-9]+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth({ permissions: 'form-question_manage_delete' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.service.delete(id);
  }
}
