import { EFormType } from '@app/constant/app.enum';
import { ChartDto } from '@modules/survey/dtos/chart-report.dto';
import { MultiChoiceData } from '@modules/survey/interfaces/report-survey-response.interface';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ViewSubmitMultiChoice } from '../entities/view-multi-choice.entity';

@Injectable()
export class ViewMultiChoiceRepository extends Repository<ViewSubmitMultiChoice> {
  constructor(dataSource: DataSource) {
    super(ViewSubmitMultiChoice, dataSource.createEntityManager());
  }

  async getBySurvey(params: ChartDto, id: number): Promise<MultiChoiceData[]> {
    const query = this.createQueryBuilder('view_submit_multi_choice').groupBy(
      'answer_id, question_id',
    );

    query.where(
      'view_submit_multi_choice.form_id = :id AND view_submit_multi_choice.form_type = :form_type',
      { id, form_type: EFormType.survey },
    );

    if (params) {
      query.andWhere('view_submit_multi_choice.question_id = :question_id', {
        question_id: params.question_id,
      });
    }

    query.select([
      'answer_id as answer_id',
      'question_id as question_id',
      'CAST(COUNT(*) AS INTEGER) as total',
    ]);

    return await query.getRawMany();
  }
}
