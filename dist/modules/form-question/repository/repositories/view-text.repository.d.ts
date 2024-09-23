import { DataSource, Repository } from 'typeorm';
import { ViewSubmitText } from '../entities/view-text.entity';
export declare class ViewTextRepository extends Repository<ViewSubmitText> {
    constructor(dataSource: DataSource);
}
