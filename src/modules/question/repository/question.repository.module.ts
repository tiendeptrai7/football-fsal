import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { AnswerRepository } from './repositories/answer.repository';
import { QuestionRepository } from './repositories/question.repository';

@Module({
  providers: [QuestionRepository, AnswerRepository],
  exports: [QuestionRepository, AnswerRepository],
  imports: [TypeOrmModule.forFeature([Question, Answer])],
})
export class QuestionRepositoryModule {}
