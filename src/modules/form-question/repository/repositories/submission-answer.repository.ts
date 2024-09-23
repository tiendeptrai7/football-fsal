import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SubmissionAnswer } from '../entities/submission-answer.entity';

@Injectable()
export class SubmissionAnswerRepository extends Repository<SubmissionAnswer> {
  constructor(dataSource: DataSource) {
    super(SubmissionAnswer, dataSource.createEntityManager());
  }
}
