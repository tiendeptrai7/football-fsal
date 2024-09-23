import { EFormType } from '@app/constant/app.enum';
import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { wrapPagination } from '@common/utils/object.util';
import { AnswerRepository } from '@modules/question/repository/repositories/answer.repository';
import { QuestionRepository } from '@modules/question/repository/repositories/question.repository';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { In } from 'typeorm';

import {
  CreateFormQuestionDto,
  FormOptionDto,
  UpdateFormQuestionDto,
} from '../dtos/create-form-question.dto';
import { FilterFormQuestionDto } from '../dtos/filter-form-question.dto';
import { CreateSubmissionDto } from '../dtos/submission-form-question.dto';
import { FormQuestion } from '../repository/entities/form-question.entity';
import { FormQuestionRepository } from '../repository/repositories/form-question.repository';
import { SubmissionRepository } from '../repository/repositories/submission.repository';
import { SubmissionAnswerRepository } from '../repository/repositories/submission-answer.repository';

@Injectable()
export class FormQuestionService {
  private formQuestionMessage: MessageService;
  constructor(
    private readonly formQuestionRepository: FormQuestionRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly submissionRepository: SubmissionRepository,
    private readonly submissionAnswerRepository: SubmissionAnswerRepository,
    i18nService: I18nService,
  ) {
    this.formQuestionMessage = new MessageService(i18nService, 'form-question');
  }

  async getById(id: number): Promise<FormQuestion> {
    const app = await this.formQuestionRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.formQuestionMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async getList(
    params: FilterFormQuestionDto,
  ): Promise<ListPaginate<FormQuestion>> {
    const [data, count] = await this.formQuestionRepository.getList(params);

    return wrapPagination<FormQuestion>(data, count, params);
  }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.formQuestionRepository.remove(app);
  }

  async createFormQuestion(
    input: CreateFormQuestionDto[],
    option: FormOptionDto,
  ): Promise<void> {
    const formPromises = input.map(async (item, index) => {
      const question = await this.questionRepository.save(item.question);
      if (question) {
        const formData = {
          order: index + 1,
          form_id: option.form_id,
          form_type: option.form_type,
          question_id: question.id,
        };
        this.formQuestionRepository.save(formData);
      }
    });
    await Promise.all(formPromises);
  }

  async updateFormQuestion(
    input: UpdateFormQuestionDto[],
    option: FormOptionDto,
  ): Promise<void> {
    const questionsToRemove = await this.formQuestionRepository.find({
      where: {
        form_id: option.form_id,
        form_type: option.form_type,
      },
      select: ['question_id'],
    });
    if (questionsToRemove.length > 0) {
      const questionIdsToRemove = questionsToRemove.map(
        (item) => item.question_id,
      );
      await this.answerRepository.delete({
        question_id: In(questionIdsToRemove),
      });
      await this.formQuestionRepository.delete({
        form_id: option.form_id,
        form_type: option.form_type,
        question_id: In(questionIdsToRemove),
      });
      await this.questionRepository.delete({
        id: In(questionIdsToRemove),
      });
    }

    await this.createFormQuestion(input, option);
  }

  async submitFormQuestion(
    event_guest_id: number,
    input: CreateSubmissionDto,
  ): Promise<void> {
    if (event_guest_id && input?.submission_form?.length > 0) {
      const submission = input.submission_form.map((v) =>
        Object.assign(v, { event_guest_id }),
      );

      await this.submissionRepository.save(submission);
    }
  }

  async verifySubmission(
    input: CreateSubmissionDto,
    event_guest_id: number,
    form_type: EFormType,
  ) {
    const submission = await this.submissionRepository.getByEventGuest(
      event_guest_id,
      form_type,
      input.form_id,
    );

    if (submission.length > 0) {
      throw new CustomError(
        404,
        'EXIST',
        this.formQuestionMessage.get('EXIST'),
      );
    }
  }

  // ----------------------------------------------------------

  async insertListFormQuestion(params: CreateFormQuestionDto[]) {
    await this.formQuestionRepository.save(params);
  }
}
