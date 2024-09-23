import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FilterQuestionDto } from '../../dtos/filter-question.dto';
import { Question } from '../entities/question.entity';

@Injectable()
export class QuestionRepository extends Repository<Question> {
  constructor(dataSource: DataSource) {
    super(Question, dataSource.createEntityManager());
  }

  async getList(params: FilterQuestionDto): Promise<[Question[], number]> {
    const query = this.createQueryBuilder('question');

    applyQuerySorting(params.sorting, query, 'question');
    applyQueryPaging(params, query);

    return await query.getManyAndCount();
  }
}
