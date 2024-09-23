import { EFormType, EStatus, ESurveyFormStatus } from '@app/constant/app.enum';
import { AuthUser } from '@auth/types/auth.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { EventGuestRepository } from '@modules/event/repository/repositories/event-guest.repository';
import { SubmissionRepository } from '@modules/form-question/repository/repositories/submission.repository';
import { FormQuestionService } from '@modules/form-question/services/form-question.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { SubmissionSurveyDto } from '../dtos/submit-survey.dto';
import { SurveyPublicListResponse } from '../interfaces/survey-response.interface';
import { Survey } from '../repository/entities/survey.entity';
import { SurveyRepository } from '../repository/repositories/survey.repository';

@Injectable()
export class SurveyPublicService {
  private surveyMessage: MessageService;
  private eventGuestMessage: MessageService;
  constructor(
    i18nService: I18nService,
    private readonly surveyRepository: SurveyRepository,
    private readonly submissionRepository: SubmissionRepository,
    private readonly eventGuestRepository: EventGuestRepository,
    private readonly formQuestionService: FormQuestionService,
  ) {
    this.surveyMessage = new MessageService(i18nService, 'survey');
    this.eventGuestMessage = new MessageService(i18nService, 'event-guest');
  }
  async getList(user: AuthUser): Promise<SurveyPublicListResponse[]> {
    const surveys = await this.surveyRepository.getByUser(user.id);
    const submissions = await this.submissionRepository.getByUser(
      user.id,
      EFormType.survey,
    );

    const submissionFormIds = new Set(
      submissions.map((s) => s?.form_question?.form_id),
    );

    const response: SurveyPublicListResponse[] = [];

    surveys.forEach((survey) => {
      if (submissionFormIds.has(survey?.id)) {
        response.push(
          Object.assign(
            {},
            {
              data: survey,
              status: ESurveyFormStatus.success,
            },
          ),
        );
      } else {
        response.push(
          Object.assign(
            {},
            {
              data: survey,
              status:
                survey.status === EStatus.inactive
                  ? ESurveyFormStatus.expired
                  : ESurveyFormStatus.inprogress,
            },
          ),
        );
      }
    });

    return response;
  }

  async getById(id: number): Promise<Survey> {
    const app = await this.surveyRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.surveyMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async getFormQuestion(user: AuthUser, id: number): Promise<Survey> {
    const form = await this.surveyRepository.getFormQuestion(user.id, id);
    const isSubmit = form.form_questions.some(
      (fq) => fq.submissions.length > 0,
    );

    if (isSubmit) {
      Object.assign(form, {
        status: ESurveyFormStatus.success,
      });
    } else {
      Object.assign(form, {
        status:
          form.status === EStatus.inactive
            ? ESurveyFormStatus.expired
            : ESurveyFormStatus.inprogress,
      });
    }
    return form;
  }

  async submit(user: AuthUser, input: SubmissionSurveyDto): Promise<void> {
    const eventGuest = await this.eventGuestRepository.getByForm(
      input.form_id,
      EFormType.survey,
      user.id,
    );

    if (!eventGuest) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'NOT_FOUND',
        this.eventGuestMessage.get('NOT_FOUND'),
      );
    }

    await this.formQuestionService.verifySubmission(
      input,
      eventGuest.id,
      EFormType.survey,
    );

    await this.formQuestionService.submitFormQuestion(eventGuest.id, input);
  }
}
