import {
  applyQueryPaging,
  applyQuerySorting,
} from '@common/database/helper/query.helper';
import { FilterZaloUserDto } from '@modules/user/dtos/filter-user.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async getZaloUserById(id: string): Promise<Profile> {
    const query = this.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('user.hcp', 'hcp')
      .leftJoinAndSelect('user.med_rep', 'med_rep')
      .leftJoinAndSelect('hcp.hco', 'hco')
      .where('profile.user_id = :id AND profile.zalo_id IS NOT NULL', { id });

    return query.getOne();
  }

  async getListZaloUser(
    params: FilterZaloUserDto,
  ): Promise<[Profile[], number]> {
    const { filter } = params;

    const query = this.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('user.hcp', 'hcp')
      .leftJoinAndSelect('user.med_rep', 'med_rep')
      .leftJoinAndSelect('hcp.hco', 'hco')
      .where('profile.zalo_id IS NOT NULL');

    if (filter) {
      query.andWhere(
        `(
            profile.zalo_id LIKE :filter OR 
            hcp.phone LIKE :filter
          )`,
        { filter: `%${params.filter}%` },
      );
    }

    applyQueryPaging(params, query);
    applyQuerySorting(params.sorting, query, 'profile');

    return query.getManyAndCount();
  }
}
