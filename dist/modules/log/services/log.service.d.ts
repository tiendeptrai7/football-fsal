import { StreamableFile } from '@nestjs/common';
export declare class LogService {
    constructor();
    getListLog(): {
        data: string[];
    };
    readLogByName(logName: string): StreamableFile | [];
}
