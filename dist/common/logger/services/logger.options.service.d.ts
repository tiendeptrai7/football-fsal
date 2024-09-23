import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
export declare const LoggerOptionService: (configService: ConfigService) => {
    format: winston.Logform.Format;
    transports: any[];
    exitOnError: boolean;
};
