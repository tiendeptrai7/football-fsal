import { StreamableFile } from '@nestjs/common';
import { LogService } from '../services/log.service';
export declare class LogAdminController {
    private readonly service;
    constructor(service: LogService);
    getListLogs(): {
        data: string[];
    };
    getLogByName(logFile: string): StreamableFile | [];
}
