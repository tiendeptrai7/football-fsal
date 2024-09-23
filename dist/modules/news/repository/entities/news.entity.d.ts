import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
export declare class News extends BaseEntity {
    title: string;
    thumbnail: string;
    code: string;
    content: string;
    status: EStatus;
    published_at: Date;
    view: number;
}
