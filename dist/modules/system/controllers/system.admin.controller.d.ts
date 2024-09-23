import { ListPaginate } from '@common/database/types/database.type';
import { CreateSystemDto } from '../dtos/create-system.dto';
import { FilterSystemDto } from '../dtos/filter-system.dto';
import { UpdateSystemDto } from '../dtos/update-system.dto';
import { System } from '../repository/entities/system.entity';
import { SystemService } from '../services/system.service';
export declare class SystemAdminController {
    private readonly service;
    constructor(service: SystemService);
    create(body: CreateSystemDto): Promise<void>;
    getList(param: FilterSystemDto): Promise<ListPaginate<System>>;
    getByKey(key: string): Promise<System>;
    getById(id: number): Promise<System>;
    update(body: UpdateSystemDto): Promise<void>;
    delete(id: number): Promise<void>;
}
