import {
  EFeedbackFormStatus,
  EFormType,
  EStatus,
} from '@app/constant/app.enum';
import { AuthUser } from '@auth/types/auth.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { EventGuestRepository } from '@modules/event/repository/repositories/event-guest.repository';
import { SubmissionRepository } from '@modules/form-question/repository/repositories/submission.repository';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';

import { SubmissionFeedbackDto } from '../dtos/submit-feedback.dto';
import { FeedbackPublicListResponse } from '../interfaces/feedback-response.interface';
import { Feedback } from '../repository/entities/feedback.entity';
import { FeedbackDocument } from '../repository/entities/feedback-document.entity';
import { FeedbackRepository } from '../repository/repositories/feedback.repository';
import { FeedbackDocumentRepository } from '../repository/repositories/feedback-document.repository';

@Injectable()
export class FeedbackPublicService {
  private feedbackMessage: MessageService;
  private eventGuestMessage: MessageService;

  constructor(
    i18nService: I18nService,
    private readonly feedbackRepository: FeedbackRepository,
    private readonly feedbackDocumentRepository: FeedbackDocumentRepository,
    private readonly submissionRepository: SubmissionRepository,
    private readonly eventGuestRepository: EventGuestRepository,
    private readonly formQuestionService: FormQuestionService,
  ) {
    this.feedbackMessage = new MessageService(i18nService, 'feedback');
    this.eventGuestMessage = new MessageService(i18nService, 'event-guest');
  }
  async getList(user: AuthUser): Promise<FeedbackPublicListResponse[]> {
    const feedbacks = await this.feedbackRepository.getByUser(user.id);
    const submissions = await this.submissionRepository.getByUser(
      user.id,
      EFormType.feedback,
    );

    const submissionFormIds = new Set(
      submissions.map((s) => s?.form_question?.form_id),
    );

    const response: FeedbackPublicListResponse[] = [];

    feedbacks.forEach((feedback) => {
      if (submissionFormIds.has(feedback?.id)) {
        response.push(
          Object.assign(
            {},
            {
              data: feedback,
              status: EFeedbackFormStatus.success,
            },
          ),
        );
      } else {
        response.push(
          Object.assign(
            {},
            {
              data: feedback,
              status: dayjs().isAfter(feedback.feedback_expire_at)
                ? EFeedbackFormStatus.expired
                : EFeedbackFormStatus.inprogress,
            },
          ),
        );
      }
    });

    return response;
  }

  async getById(id: number): Promise<Feedback> {
    const app = await this.feedbackRepository.findOne({
      where: { id, status: EStatus.active },
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

  async getFormQuestion(user: AuthUser, id: number): Promise<Feedback> {
    const form = await this.feedbackRepository.getFormQuestion(user.id, id);
    const isSubmit = form.form_questions.some(
      (fq) => fq.submissions.length > 0,
    );

    if (isSubmit) {
      Object.assign(form, {
        status: EFeedbackFormStatus.success,
      });
    } else {
      Object.assign(form, {
        status:
          form.status === EStatus.inactive
            ? EFeedbackFormStatus.expired
            : EFeedbackFormStatus.inprogress,
      });
    }
    return form;
  }

  async submit(user: AuthUser, input: SubmissionFeedbackDto): Promise<void> {
    const eventGuest = await this.eventGuestRepository.getByForm(
      input.form_id,
      EFormType.feedback,
      user.id,
    );
    if (!eventGuest) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.eventGuestMessage.get('NOT_FOUND'),
      );
    }
    await this.formQuestionService.submitFormQuestion(eventGuest.id, input);
  }

  async getListDocument(
    user: AuthUser,
    id: number,
  ): Promise<FeedbackDocument[]> {
    return await this.feedbackDocumentRepository.getByUser(user.id, id);
  }
}
