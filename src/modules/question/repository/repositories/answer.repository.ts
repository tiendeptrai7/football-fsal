import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswerRepository extends Repository<Answer> {
  constructor(dataSource: DataSource) {
    super(Answer, dataSource.createEntityManager());
  }
}
