import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ViewSubmitPercentage } from '../entities/view-percentage.entity';

@Injectable()
export class ViewPercentageRepository extends Repository<ViewSubmitPercentage> {
  constructor(dataSource: DataSource) {
    super(ViewSubmitPercentage, dataSource.createEntityManager());
  }
}
