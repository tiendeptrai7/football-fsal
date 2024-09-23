import { ArgumentsHost, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
export declare class ErrorHttpFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    private static handleResponse;
    catch(exception: HttpException | Error, host: ArgumentsHost): void;
    private handleMessage;
}
