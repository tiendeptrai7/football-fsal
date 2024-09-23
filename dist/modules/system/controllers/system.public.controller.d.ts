import { System } from '../repository/entities/system.entity';
import { SystemService } from '../services/system.service';
export declare class SystemPublicController {
    private readonly service;
    constructor(service: SystemService);
    getListPublic(): Promise<System[]>;
    getPublicByKey(key: string): Promise<System>;
}
