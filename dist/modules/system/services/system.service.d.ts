import { ListPaginate } from '@common/database/types/database.type';
import { Cache } from 'cache-manager';
import { I18nService } from 'nestjs-i18n';
import { CreateSystemDto } from '../dtos/create-system.dto';
import { FilterSystemDto } from '../dtos/filter-system.dto';
import { UpdateSystemDto } from '../dtos/update-system.dto';
import { System } from '../repository/entities/system.entity';
import { SystemRepository } from '../repository/repositories/system.repository';
export declare class SystemService {
    private readonly cacheManager;
    private readonly systemRepository;
    private messageService;
    private _specialKeys;
    constructor(cacheManager: Cache, systemRepository: SystemRepository, i18nService: I18nService);
    getList(params: FilterSystemDto): Promise<ListPaginate<System>>;
    create(input: CreateSystemDto): Promise<void>;
    update(input: UpdateSystemDto): Promise<void>;
    getById(id: number): Promise<System>;
    getByKey(key: string): Promise<System>;
    getValueByKey(key: string, skipRevalidate?: boolean): Promise<string>;
    delete(id: number): Promise<void>;
    getListPublic(): Promise<System[]>;
    getPublicByKey(key: string): Promise<System>;
    cachingDefaultValue(): Promise<void>;
    private _checkDuplicateKey;
    private _cachingSpecialKey;
}
