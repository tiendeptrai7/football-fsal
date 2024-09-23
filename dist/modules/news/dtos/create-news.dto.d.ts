import { EStatus } from '@app/constant/app.enum';
export declare class CreateNewsDto {
    title: string;
    content: string;
    published_at: Date;
    status: EStatus;
    thumbnail: string;
}
