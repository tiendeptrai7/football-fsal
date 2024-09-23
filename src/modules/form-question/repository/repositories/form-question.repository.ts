import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FormQuestionDto } from '@modules/form-question/dtos/form-question.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FilterFormQuestionDto } from '../../dtos/filter-form-question.dto';
import { FormQuestion } from '../entities/form-question.entity';

@Injectable()
export class FormQuestionRepository extends Repository<FormQuestion> {
  constructor(dataSource: DataSource) {
    super(FormQuestion, dataSource.createEntityManager());
  }

  async getList(
    params: FilterFormQuestionDto,
  ): Promise<[FormQuestion[], number]> {
    const query = this.createQueryBuilder('form-question');

    applyQuerySorting(params.sorting, query, 'form-question');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }

  async getFormQuestions(form_id?: number): Promise<FormQuestionDto[]> {
    const query = this.createQueryBuilder('form-question')
      .leftJoinAndSelect('form-question.question', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .andWhere('form-question.form_id = :form_id', { form_id });
    return await query.getMany();
  }
}
