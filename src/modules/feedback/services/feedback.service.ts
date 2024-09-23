import { INCREMENT_CODE } from '@app/constant/app.constant';
import { EFormType, EStatus } from '@app/constant/app.enum';
import { CacheService } from '@common/cache/services/cache.service';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { EventService } from '@modules/event/services/event.service';
import { FormQuestion } from '@modules/form-question/repository/entities/form-question.entity';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { QuestionService } from '@modules/question/services/question.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { CreateFeedbackDto } from '../dtos/create-feedback.dto';
import { FilterFeedbackDto } from '../dtos/filter-feedback.dto';
import { UpdateFeedbackDto } from '../dtos/update-feedback.dto';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackRepository } from '../repository/repositories/feedback.repository';
import { FeedbackDocumentService } from './feedback-document.service';

@Injectable()
export class FeedbackService {
  private eventMessage: MessageService;
  private feedbackMessage: MessageService;

  constructor(
    i18nService: I18nService,
    private readonly cacheService: CacheService,
    private readonly eventService: EventService,
    private readonly questionService: QuestionService,
    private readonly formQuestionService: FormQuestionService,
    private readonly feedbackDocumentService: FeedbackDocumentService,
    private readonly feedbackRepository: FeedbackRepository,
  ) {
    this.eventMessage = new MessageService(i18nService, 'event');
    this.feedbackMessage = new MessageService(i18nService, 'feedback');
  }
  async getList(params: FilterFeedbackDto): Promise<ListPaginate<Feedback>> {
    const [data, count] = await this.feedbackRepository.getList(params);

    return wrapPagination<Feedback>(data, count, params);
  }

  async getById(id: number): Promise<Feedback> {
    const app = await this.feedbackRepository.findOne({
      where: { id, form_questions: { form_type: EFormType.feedback } },
      relations: [
        'event',
        'feedback_documents',
        'form_questions',
        'form_questions.question',
        'form_questions.question.answers',
      ],
    });

    if (!app) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.feedbackMessage.get('NOT_FOUND'),
      );
    }

    return app;
  }

  async create(input: CreateFeedbackDto): Promise<void> {
    const event = await this.eventService.getById(input.event_id);

    if (!event) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.eventMessage.get('NOT_FOUND'),
      );
    }

    const code = await this._getINCRCode();

    const { form_questions, ...createFeedbackDto } = input;

    Object.assign(createFeedbackDto, { code });

    const feedback = await this.feedbackRepository.save(createFeedbackDto);

    const formQuestions = [];

    for (const [index, insertFormQuestionDto] of form_questions.entries()) {
      const question = await this.questionService.create(
        insertFormQuestionDto.question,
      );

      formQuestions.push(
        Object.assign(
          {},
          {
            order: index + 1,
            form_id: feedback.id,
            form_type: EFormType.feedback,
            question_id: question.id,
          },
        ),
      );
    }

    await this.formQuestionService.insertListFormQuestion(formQuestions);
  }

  async update(input: UpdateFeedbackDto): Promise<void> {
    const event = await this.eventService.getById(input.event_id);

    if (!event) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.eventMessage.get('NOT_FOUND'),
      );
    }

    const feedback = await this.feedbackRepository.findOne({
      where: {
        id: input.id,
      },
      relations: ['form_questions', 'feedback_documents'],
    });

    if (!feedback) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.feedbackMessage.get('NOT_FOUND'),
      );
    }

    const { form_questions, feedback_documents, ...updateData } = input;

    Object.assign(feedback, updateData);

    const formQuestions = [];

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
        form_id: feedback.id,
        form_type: EFormType.feedback,
        question_id: question.id,
      });

      formQuestions.push(formQuestion);
    }

    feedback.form_questions = formQuestions;

    const feedbackDocuments = [];

    for (const updateFeedbackDocumentDto of feedback_documents) {
      let feedbackDocument: FeedbackDocument;

      if (updateFeedbackDocumentDto.id) {
        feedbackDocument = await this.feedbackDocumentService.getById(
          updateFeedbackDocumentDto.id,
        );
        if (!feedbackDocument) {
          throw new CustomError(
            HttpStatus.NOT_FOUND,
            'NOT_FOUND',
            this.feedbackMessage.get('NOT_FOUND'),
          );
        }
      } else {
        feedbackDocument = new FeedbackDocument();
      }

      Object.assign(feedbackDocument, {
        url: updateFeedbackDocumentDto.url,
        feedback_id: feedback.id,
      });

      feedbackDocuments.push(feedbackDocument);
    }

    feedback.feedback_documents = feedbackDocuments;

    await this.feedbackRepository.save(feedback);
  }

  async toggle(id: number): Promise<void> {
    const event = await this.feedbackRepository.findOneBy({ id });

    if (!event) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.feedbackMessage.get('NOT_FOUND'),
      );
    }

    const status = event.status ? EStatus.inactive : EStatus.active;

    await this.feedbackRepository.update({ id }, { status });
  }

  async _getINCRCode(): Promise<string> {
    const getLastCode = async () => {
      const lastRecord = await this.feedbackRepository.findOne({
        where: {},
        order: {
          id: 'DESC',
        },
      });

      return lastRecord?.code || '';
    };

    const identifier = `${dayjs().format('YYYY_MM')}`;

    return this.cacheService.generateCodeINCR(
      INCREMENT_CODE.FEEDBACK,
      'FB',
      identifier,
      getLastCode,
    );
  }
}
