import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
export declare class S3Service {
    private readonly logger;
    private readonly configService;
    private readonly chunkSize;
    private readonly s3;
    private readonly s3Message;
    constructor(logger: Logger, configService: ConfigService, i18nService: I18nService);
    getFile(key: string): Promise<Uint8Array>;
    uploadFile(file: Blob, filename: string): Promise<string>;
    private createMultipartUpload;
    private uploadMultipartChunks;
    private uploadMultipartChunk;
    private completeMultipartUpload;
    private _uploadFile;
    private _getFileKey;
}
