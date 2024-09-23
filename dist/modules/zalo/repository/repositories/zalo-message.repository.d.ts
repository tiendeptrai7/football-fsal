import { FilterZaloMessageDto } from '@modules/zalo/dtos/filter-zalo-message.dto';
import { DataSource, Repository } from 'typeorm';
import { ZaloMessage } from '../entities/zalo-message.entity';
export declare class ZaloMessageRepository extends Repository<ZaloMessage> {
    constructor(dataSource: DataSource);
    getZaloOAMessages(params: FilterZaloMessageDto, isExport?: boolean): Promise<[ZaloMessage[], number]>;
    getObserverList(): Promise<{
        observer_id: string;
        observer_name: string;
    }[]>;
}
