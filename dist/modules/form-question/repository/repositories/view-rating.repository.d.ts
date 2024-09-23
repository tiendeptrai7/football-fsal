import { DataSource, Repository } from 'typeorm';
import { ViewSubmitRating } from '../entities/view-rating.entity';
export declare class ViewRatingRepository extends Repository<ViewSubmitRating> {
    constructor(dataSource: DataSource);
}
