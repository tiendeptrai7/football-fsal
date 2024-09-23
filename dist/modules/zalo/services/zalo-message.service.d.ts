import { AuthUser } from '@auth/types/auth.type';
import { ListPaginate } from '@common/database/types/database.type';
import { ExcelService } from '@common/excel/services/excel.service';
import { ExportResponse } from '@common/response/types/base.reponse.type';
import { FilterZaloMessageDto } from '../dtos/filter-zalo-message.dto';
import { ObserveMessageDto } from '../dtos/update-zalo-message.dto';
import { ZaloMessage } from '../repository/entities/zalo-message.entity';
import { ZaloMessageRepository } from '../repository/repositories/zalo-message.repository';
export declare class ZaloMessageService {
    private readonly excelService;
    private readonly zaloMessageRepository;
    constructor(excelService: ExcelService, zaloMessageRepository: ZaloMessageRepository);
    getListOAMessage(params: FilterZaloMessageDto): Promise<ListPaginate<ZaloMessage>>;
    getObserverList(): Promise<{
        observer_id: string;
        observer_name: string;
    }[]>;
    observeMessage(user: AuthUser, body: ObserveMessageDto): Promise<void>;
    export(params: FilterZaloMessageDto): Promise<ExportResponse>;
}
