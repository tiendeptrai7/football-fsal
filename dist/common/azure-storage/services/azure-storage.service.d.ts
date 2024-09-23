import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
export declare class AzureStorageService {
    private readonly logger;
    private readonly configService;
    private readonly sasConnectionString;
    private readonly containerName;
    private readonly chunkSize;
    private readonly blobServiceClient;
    private readonly containerClient;
    private readonly azureStorageMessage;
    constructor(logger: Logger, configService: ConfigService, i18nService: I18nService);
    getFile(key: string): Promise<Uint8Array>;
    uploadFile(file: Blob, filename: string): Promise<string>;
    private _uploadFile;
    private _uploadFileInChunks;
    private getBlockId;
    private _getFileKey;
    private _streamToByteArray;
}
