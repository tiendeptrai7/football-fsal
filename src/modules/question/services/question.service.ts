import { ListPaginate } from '@common/database/types/database.type';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { objOmit, wrapPagination } from '@common/utils/object.util';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';

import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { FilterQuestionDto } from '../dtos/filter-question.dto';
import { UpdateQuestionDto$ } from '../dtos/update-question.dto';
import { Answer } from '../repository/entities/answer.entity';
import { Question } from '../repository/entities/question.entity';
import { QuestionRepository } from '../repository/repositories/question.repository';

@Injectable()
export class QuestionService {
  private questionMessage: MessageService;

  constructor(
    private readonly questionRepository: QuestionRepository,
    i18nService: I18nService,
  ) {
    this.questionMessage = new MessageService(i18nService, 'question');
  }

  async create(input: CreateQuestionDto): Promise<Question> {
    const transformedInput = plainToClass(CreateQuestionDto, {
      ...input,
      answers: input.answers?.map((a) => objOmit(a, ['id'])),
    });

    return await this.questionRepository.save(transformedInput);
  }

  async getById(id: number): Promise<Question> {
    const app = await this.questionRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.questionMessage.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async getList(params: FilterQuestionDto): Promise<ListPaginate<Question>> {
    const [data, count] = await this.questionRepository.getList(params);

    return wrapPagination<Question>(data, count, params);
  }

  // async update(input: UpdateQuestionDto): Promise<void> {
  //   const app = await this.getById(input.id);

  //   Object.assign(app, { ...input });

  //   await this.questionRepository.save(app);
  // }

  async delete(id: number): Promise<void> {
    const app = await this.getById(id);
    await this.questionRepository.remove(app);
  }

  async upsert(input: UpdateQuestionDto$): Promise<Question> {
    let existingQuestion: Question | null = null;

    if (input?.id) {
      existingQuestion = await this.questionRepository.findOne({
        where: { id: input.id },
      });
    }

    if (existingQuestion) {
      Object.assign(existingQuestion, input);
    } else {
      const answers: CreateAnswerDto[] = input.answers.map(
        (answer: Answer) => ({ ...objOmit(answer, ['id']) }) as CreateAnswerDto,
      );

      existingQuestion = this.questionRepository.create({ ...input, answers });
    }

    return await this.questionRepository.save(existingQuestion);
  }
}
