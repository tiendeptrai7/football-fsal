import { ListPaginate } from '@common/database/types/database.type';
import { MessageService } from '@common/message/services/message.service';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { FutsalTeam } from '../repository/entities/futsal-team.entity';
import { FilterFutsalTeamDto } from '../dtos/filter.dto';
import { FutsalTeamRepository } from '../repository/repositories/futsal-team.repository';
import { PlayerRepository } from '../repository/repositories/player.repository';
import { wrapPagination } from '@common/utils/object.util';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { EStatus } from '@app/constant/app.enum';
import { CreateFutsalTeamDto } from '../dtos/create.dto';
import { UpdateFutsalTeamDto } from '../dtos/update.dto';

@Injectable()
export class FutsalTeamService {
  private message: MessageService;
  constructor(
    i18nService: I18nService,
    private readonly futsalTeamRepository: FutsalTeamRepository,
    private readonly playerRepository: PlayerRepository,
  ) {
    this.message = new MessageService(i18nService, '');
  }

  async getList(params: FilterFutsalTeamDto): Promise<ListPaginate<FutsalTeam>> {
    const [data, count] = await this.futsalTeamRepository.getList(params);

    return wrapPagination<FutsalTeam>(data, count, params);
  }

  async getById(id: number): Promise<FutsalTeam> {
    const app = await this.futsalTeamRepository.findOneBy({ id });
    if (!app) {
      throw new CustomError(
        404,
        'NOT_FOUND',
        this.message.get('NOT_FOUND'),
      );
    }
    return app;
  }

  async create(input: CreateFutsalTeamDto): Promise<void> {
    await this.futsalTeamRepository.save(input);
  }

  async update(input: UpdateFutsalTeamDto): Promise<void> {
    const app = await this.getById(input.id);
    Object.assign(app, { ...input });
    await this.futsalTeamRepository.save(app);
  }

  async toggle(id: number): Promise<void> {
    const news = await this.getById(id);
    const status = news.status ? EStatus.inactive : EStatus.active;
    await this.futsalTeamRepository.update({ id }, { status });
  }

}
