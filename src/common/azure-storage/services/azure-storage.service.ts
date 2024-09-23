import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';
import CustomError from '@common/error/exceptions/custom-error.exception';
import { MessageService } from '@common/message/services/message.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import mime from 'mime-types';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AzureStorageService {
  private readonly sasConnectionString;
  private readonly containerName;
  private readonly chunkSize = 4 * 1024 * 1024;

  private readonly blobServiceClient: BlobServiceClient;
  private readonly containerClient: ContainerClient;

  private readonly azureStorageMessage: MessageService;
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    i18nService: I18nService,
  ) {
    this.azureStorageMessage = new MessageService(i18nService, 'azure-storage');
    this.sasConnectionString = this.configService.get(
      'azureStorage.sasConnectionString',
    );
    this.containerName = this.configService.get('azureStorage.containerName');

    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.sasConnectionString,
    );
    this.containerClient = this.blobServiceClient.getContainerClient(
      this.containerName,
    );
  }

  async getFile(key: string): Promise<Uint8Array> {
    try {
      const blockBlobClient: BlockBlobClient =
        this.containerClient.getBlockBlobClient(key);
      const downloadBlockBlobResponse = await blockBlobClient.download();

      const downloaded = await this._streamToByteArray(
        downloadBlockBlobResponse.readableStreamBody,
      );

      return downloaded;
    } catch (error) {
      this.logger.error(
        `Error while getting file from Azure Blob Storage with key ${key}.`,
        error,
        'AzureBlobService.getFile',
      );

      throw new CustomError(
        400,
        'FILE_NOT_FOUND',
        this.azureStorageMessage.get('FILE_NOT_FOUND'),
      );
    }
  }

  async uploadFile(file: Blob, filename: string): Promise<string> {
    const key = this._getFileKey(filename);

    try {
      if (file.size <= this.chunkSize) {
        await this._uploadFile(file, key);
      } else {
        await this._uploadFileInChunks(file, key);
      }

      return key;
    } catch (error) {
      this.logger.error(
        `Error uploading file with key ${key} to azure:`,
        error,
        'AzureStorageService.uploadFile',
      );
      throw error;
    }
  }

  private async _uploadFile(file: Blob, key: string): Promise<void> {
    const blockBlobClient: BlockBlobClient =
      this.containerClient.getBlockBlobClient(key);

    const buffer = Buffer.from(await file.arrayBuffer());

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type },
    });
  }

  private async _uploadFileInChunks(file: Blob, key: string): Promise<void> {
    const blockBlobClient: BlockBlobClient =
      this.containerClient.getBlockBlobClient(key);

    const blockIds = [];
    const fileSize = file.size;
    let offset = 0;

    while (offset < fileSize) {
      const chunk = file.slice(offset, offset + this.chunkSize);
      const blockId = this.getBlockId(offset);
      blockIds.push(blockId);

      await blockBlobClient.stageBlock(blockId, chunk, chunk.size);
      offset += this.chunkSize;
    }

    await blockBlobClient.commitBlockList(blockIds, {
      blobHTTPHeaders: { blobContentType: file.type },
    });
  }

  private getBlockId(index: number): string {
    return btoa(index.toString().padStart(48, '0'));
  }

  private _getFileKey(fileName: string): string {
    const folder = mime.lookup(fileName).toString().split('/')[0] + 's';
    const now = Date.now();

    return `/${folder}/${dayjs().format('YYYY/MM/DD')}/${now}_${fileName}`;
  }

  private async _streamToByteArray(
    stream: NodeJS.ReadableStream,
  ): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (data) => chunks.push(data));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
