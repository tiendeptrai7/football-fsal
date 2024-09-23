import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ViewSubmitText } from '../entities/view-text.entity';

@Injectable()
export class ViewTextRepository extends Repository<ViewSubmitText> {
  constructor(dataSource: DataSource) {
    super(ViewSubmitText, dataSource.createEntityManager());
  }
}
