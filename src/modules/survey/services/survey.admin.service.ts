import { INCREMENT_CODE } from '@app/constant/app.constant';
import { EFormType, EStatus } from '@app/constant/app.enum';
import { CacheService } from '@common/cache/services/cache.service';
import { BaseFilterParamDto } from '@common/database/dtos/base-filter.dto';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { ExcelService } from '@common/excel/services/excel.service';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { EventGuest } from '@modules/event/repository/entities/event-guest.entity';
import { EventService } from '@modules/event/services/event.service';
import { EventGuestService } from '@modules/event/services/event-guest.service';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { FormQuestionRepository } from '@modules/form-question/repository/repositories/form-question.repository';
import { ViewMultiChoiceRepository } from '@modules/form-question/repository/repositories/view-multi-choice.repository';
import { ViewPercentageRepository } from '@modules/form-question/repository/repositories/view-percentage.repository';
import { ViewSingleChoiceRepository } from '@modules/form-question/repository/repositories/view-single-choice.repository';
import { ViewTextRepository } from '@modules/form-question/repository/repositories/view-text.repository';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { QuestionService } from '@modules/question/services/question.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { ChartDto } from '../dtos/chart-report.dto';
import { CreateSurveyFormDto } from '../dtos/create-survey.dto';
import { FilterSurveyDto } from '../dtos/filter-survey.dto';
import { FilterParticipantDto } from '../dtos/participant-report-filter.dto';
import { UpdateSurveyFormDto } from '../dtos/update-survey.dto';
import {
  BarChartResponse,
  DetailResponse,
  LineChartResponse,
  OverviewResponse,
  ShortAnswerResponse,
} from '../interfaces/report-survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyRepository } from '../repository/repositories/survey.repository';

@Injectable()
export class SurveyAdminService {
  private eventMessage: MessageService;
  private surveyMessage: MessageService;

  constructor(
    i18nService: I18nService,
    private readonly cacheService: CacheService,
    private readonly eventService: EventService,
    private readonly eventGuestService: EventGuestService,
    private readonly questionService: QuestionService,
    private readonly surveyRepository: SurveyRepository,
    private readonly formQuestionRepository: FormQuestionRepository,
    private readonly viewMultiChoiceRepository: ViewMultiChoiceRepository,
    private readonly viewSingleChoiceRepository: ViewSingleChoiceRepository,
    private readonly viewTextRepository: ViewTextRepository,
    private readonly viewPercentageRepository: ViewPercentageRepository,
    private readonly formQuestionService: FormQuestionService,
  ) {
    this.eventMessage = new MessageService(i18nService, 'event');
    this.surveyMessage = new MessageService(i18nService, 'survey');
  }
  async getList(params: FilterSurveyDto): Promise<ListPaginate<Survey>> {
    const [data, count] = await this.surveyRepository.getList(params);

    return wrapPagination<Survey>(data, count, params);
  }

  async getById(id: number): Promise<Survey> {
    const app = await this.surveyRepository.findOne({
      where: {
        id,
        form_questions: {
          form_type: EFormType.survey,
        },
      },
      relations: [
        'form_questions',
        'form_questions.question',
        'form_questions.question.answers',
      ],
    });
    if (!app) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.surveyMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async create(input: CreateSurveyFormDto): Promise<void> {
    const event = await this.eventService.getById(input?.event_id);

    if (!event) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.eventMessage.get('NOT_FOUND'),
      );
    }

    const code = await this._getINCRCode();

    const { form_questions, ...createSurveyDto } = input;

    Object.assign(createSurveyDto, { code });
    const survey = await this.surveyRepository.save(createSurveyDto);

    // Create survey questions and answers
    if (form_questions.length > 0) {
      await this.formQuestionService.createFormQuestion(form_questions, {
        form_id: survey.id,
        form_type: EFormType.survey,
      });
    }
  }

  async update(input: UpdateSurveyFormDto): Promise<void> {
    const survey = await this.getById(input.id);
    const event = await this.eventService.getById(input.event_id);

    if (!event) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.eventMessage.get('NOT_FOUND'),
      );
    }

    if (!survey) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.surveyMessage.get('NOT_FOUND'),
      );
    }

    const { form_questions, ...updateData } = input;
    Object.assign(survey, updateData);

    const formQuestions: FormQuestion[] = [];
    for (const [index, updateFormQuestionDto] of form_questions.entries()) {
      let formQuestion: FormQuestion;

      if (updateFormQuestionDto.id) {
        formQuestion = await this.formQuestionService.getById(
          updateFormQuestionDto.id,
        );
      } else {
        formQuestion = new FormQuestion();
      }

      const question = await this.questionService.upsert(
        updateFormQuestionDto.question,
      );

      Object.assign(formQuestion, {
        order: index + 1,
        form_id: survey.id,
        form_type: EFormType.survey,
        question_id: question.id,
      });
      formQuestions.push(formQuestion);
    }
    survey.form_questions = formQuestions;
    await this.surveyRepository.save(survey);
  }

  async toggle(id: number): Promise<void> {
    const survey = await this.getById(id);

    const status = survey.status ? EStatus.inactive : EStatus.active;

    await this.surveyRepository.update({ id }, { status });
  }

  async copy(id: number): Promise<void> {
    const survey = await this.surveyRepository.getById(id);
    if (!survey) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.surveyMessage.get('NOT_FOUND'),
      );
    }
    const code = await this._getINCRCode();
    const newSurvey = await this.surveyRepository.save({
      ...survey,
      code: code,
    });

    await this.formQuestionRepository.save(
      survey.form_questions.map((fq) =>
        Object.assign(fq, { form_id: newSurvey.id }),
      ),
    );
  }

  async _getINCRCode(): Promise<string> {
    const getLastCode = async () => {
      const lastRecord = await this.surveyRepository.findOne({
        where: {},
        order: {
          id: 'DESC',
        },
      });

      return lastRecord?.code || '';
    };

    const identifier = `${dayjs().format('YYYY_MM')}`;

    return this.cacheService.generateCodeINCR(
      INCREMENT_CODE.SURVEY,
      'SV',
      identifier,
      getLastCode,
    );
  }

  async getListRport(
    params: BaseFilterParamDto,
  ): Promise<ListPaginate<Survey>> {
    const [data, count] = await this.surveyRepository.getListReport(params);

    const dataReport = data.map((d) => {
      return Object.assign(d, {
        event_guest_total: d.event?.event_guest?.length ?? 0,
      });
    });

    return wrapPagination<Survey>(dataReport, count, params);
  }

  async getListParticipantReport(
    params: FilterParticipantDto,
  ): Promise<ListPaginate<EventGuest>> {
    return await this.eventGuestService.getListParticipantReport(params);
  }

  async getOverviewReport(id: number): Promise<OverviewResponse> {
    const app = await this.surveyRepository.getOverviewReport(id);
    const reportData = app?.event?.event_guest.map((event_guest) => {
      if (event_guest?.submissions.length > 0) {
        event_guest.submissions = event_guest.submissions.filter(
          (submission) => {
            return (
              submission?.form_question?.form_id === id &&
              submission?.form_question?.form_type === EFormType.survey
            );
          },
        );
      }
      return event_guest;
    });

    const total = app?.event?.event_guest?.length ?? 0;
    const completed = reportData.filter((e) => e.submissions.length > 0) ?? [];
    return {
      total_completed: completed.length,
      total_uncompleted: total - completed.length,
    };
  }

  async getDetailReport(id: number): Promise<DetailResponse[]> {
    const app = await this.surveyRepository.getDetailReport(id);
    const reportData = app?.form_questions?.map((form) => {
      return {
        question_type: form?.question?.type,
        question_content: form?.question?.content,
        question_id: form?.question_id,
      };
    });

    return reportData;
  }

  async getBarChart(param: ChartDto, id: number): Promise<BarChartResponse> {
    const multiChoice = await this.viewMultiChoiceRepository.getBySurvey(
      param,
      id,
    );

    const singleChoice = await this.viewSingleChoiceRepository.getBySurvey(
      param,
      id,
    );

    const data = [...multiChoice, ...singleChoice];

    return {
      categories: data.map((a) => a.answer_id.toString()),
      data: data.map((a) => a.total.toString()),
    };
  }

  async getShortAnswer(
    param: ChartDto,
    id: number,
  ): Promise<ShortAnswerResponse[]> {
    const data = await this.viewTextRepository.find({
      where: {
        question_id: parseInt(param.question_id),
        form_id: id,
      },
      select: ['answer_text'],
    });
    return data;
  }

  async getLineChart(param: ChartDto, id: number): Promise<LineChartResponse> {
    const percentage = await this.viewPercentageRepository.find({
      where: {
        question_id: parseInt(param.question_id),
        form_id: id,
      },
      select: ['answer_value', 'question_content'],
    });
    return {
      categories: percentage.map((a) => a.question_content.toString()),
      data: percentage.map((a) => a.answer_value.toString()),
    };
  }
}
