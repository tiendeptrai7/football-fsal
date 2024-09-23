import { EFormType, EQuestionType } from '@app/constant/app.enum';
import { Question } from '@modules/question/repository/entities/question.entity';
import { DataSource, Index, ViewColumn, ViewEntity } from 'typeorm';

import { FormQuestion } from './form-question.entity';
import { Submission } from './submission.entity';

@ViewEntity({
  name: 'view_submit_text',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('submission.event_guest_id', 'event_guest_id')
      .addSelect('form_question.form_id', 'form_id')
      .addSelect('form_question.form_type', 'form_type')
      .addSelect('form_question.order', 'order')
      .addSelect('question.id', 'question_id')
      .addSelect('submission.question_content', 'question_content')
      .addSelect('submission.answer_text', 'answer_text')
      .from(FormQuestion, 'form_question')
      .leftJoin(Question, 'question', 'question.id = form_question.question_id')
      .leftJoin(
        Submission,
        'submission',
        'submission.form_question_id = form_question.id',
      )
      .where(`submission.question_type = ${EQuestionType.text}`)
      .andWhere(`submission.id IS NOT NULL`),
})
export class ViewSubmitText {
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
  answer_text: string;
}
