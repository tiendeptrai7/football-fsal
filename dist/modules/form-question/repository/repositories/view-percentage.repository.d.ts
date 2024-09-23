import { DataSource, Repository } from 'typeorm';
import { ViewSubmitPercentage } from '../entities/view-percentage.entity';
export declare class ViewPercentageRepository extends Repository<ViewSubmitPercentage> {
    constructor(dataSource: DataSource);
}
