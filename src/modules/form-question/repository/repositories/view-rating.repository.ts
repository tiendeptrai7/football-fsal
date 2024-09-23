import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ViewSubmitRating } from '../entities/view-rating.entity';

@Injectable()
export class ViewRatingRepository extends Repository<ViewSubmitRating> {
  constructor(dataSource: DataSource) {
    super(ViewSubmitRating, dataSource.createEntityManager());
  }
}
