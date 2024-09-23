import { AuthUser } from '@auth/types/auth.type';
import { FilterZaloMessageDto } from '../dtos/filter-zalo-message.dto';
import { ObserveMessageDto } from '../dtos/update-zalo-message.dto';
import { ZaloMessageService } from '../services/zalo-message.service';
export declare class ZaloMessageAdminController {
    private readonly service;
    constructor(service: ZaloMessageService);
    getList(params: FilterZaloMessageDto): Promise<import("../../../common/database/types/database.type").ListPaginate<import("../repository/entities/zalo-message.entity").ZaloMessage>>;
    getObserverList(): Promise<{
        observer_id: string;
        observer_name: string;
    }[]>;
    observeMessages(user: AuthUser, body: ObserveMessageDto): Promise<void>;
    export(params: FilterZaloMessageDto): Promise<import("../../../common/response/types/base.reponse.type").ExportResponse>;
}
