import { EFormType, EQuestionType } from '@app/constant/app.enum';
import { Question } from '@modules/question/repository/entities/question.entity';
import { DataSource, Index, ViewColumn, ViewEntity } from 'typeorm';

import { FormQuestion } from './form-question.entity';
import { Submission } from './submission.entity';
import { SubmissionAnswer } from './submission-answer.entity';

@ViewEntity({
  name: 'view_submit_single_choice',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('submission.event_guest_id', 'event_guest_id')
      .addSelect('form_question.form_id', 'form_id')
      .addSelect('form_question.form_type', 'form_type')
      .addSelect('form_question.order', 'order')
      .addSelect('question.id', 'question_id')
      .addSelect('submission.question_content', 'question_content')
      .addSelect('submission_answer.answer_id', 'answer_id')
      .addSelect('submission_answer.answer_text', 'answer_text')
      .addSelect('submission_answer.answer_content', 'answer_content')
      .from(FormQuestion, 'form_question')
      .leftJoin(Question, 'question', 'question.id = form_question.question_id')
      .leftJoin(
        Submission,
        'submission',
        'submission.form_question_id = form_question.id',
      )
      .leftJoin(
        SubmissionAnswer,
        'submission_answer',
        'submission.id = submission_answer.submission_id',
      )
      .where(`submission.question_type = ${EQuestionType.single_choice}`)
      .andWhere(`submission.id IS NOT NULL`),
})
export class ViewSubmitSingleChoice {
  @Index()
  @ViewColumn()
  form_id: number;

  @Index()
  @ViewColumn()
  event_guest_id: number;

  @ViewColumn()
  form_type: EFormType;

  @ViewColumn()
  order: number;

  @Index()
  @ViewColumn()
  question_id: number;

  @ViewColumn()
  question_content: string;

  @ViewColumn()
  answer_id: number;

  @ViewColumn()
  answer_text: string;

  @ViewColumn()
  answer_content: string;
}
