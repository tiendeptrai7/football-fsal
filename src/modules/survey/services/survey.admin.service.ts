import { INCREMENT_CODE } from '@app/constant/app.constant';
import { EFormType, EStatus } from '@app/constant/app.enum';
import { CacheService } from '@common/cache/services/cache.service';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
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

import { CreateSurveyFormDto } from '../dtos/create-survey.dto';
import { FilterSurveyDto } from '../dtos/filter-survey.dto';
import { UpdateSurveyFormDto } from '../dtos/update-survey.dto';
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
}
