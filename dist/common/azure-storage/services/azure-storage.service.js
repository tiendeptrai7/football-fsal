"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureStorageService = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const custom_error_exception_1 = __importDefault(require("../../error/exceptions/custom-error.exception"));
const message_service_1 = require("../../message/services/message.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dayjs_1 = __importDefault(require("dayjs"));
const mime_types_1 = __importDefault(require("mime-types"));
const nestjs_i18n_1 = require("nestjs-i18n");
let AzureStorageService = class AzureStorageService {
    logger;
    configService;
    sasConnectionString;
    containerName;
    chunkSize = 4 * 1024 * 1024;
    blobServiceClient;
    containerClient;
    azureStorageMessage;
    constructor(logger, configService, i18nService) {
        this.logger = logger;
        this.configService = configService;
        this.azureStorageMessage = new message_service_1.MessageService(i18nService, 'azure-storage');
        this.sasConnectionString = this.configService.get('azureStorage.sasConnectionString');
        this.containerName = this.configService.get('azureStorage.containerName');
        this.blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(this.sasConnectionString);
        this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    }
    async getFile(key) {
        try {
            const blockBlobClient = this.containerClient.getBlockBlobClient(key);
            const downloadBlockBlobResponse = await blockBlobClient.download();
            const downloaded = await this._streamToByteArray(downloadBlockBlobResponse.readableStreamBody);
            return downloaded;
        }
        catch (error) {
            this.logger.error(`Error while getting file from Azure Blob Storage with key ${key}.`, error, 'AzureBlobService.getFile');
            throw new custom_error_exception_1.default(400, 'FILE_NOT_FOUND', this.azureStorageMessage.get('FILE_NOT_FOUND'));
        }
    }
    async uploadFile(file, filename) {
        const key = this._getFileKey(filename);
        try {
            if (file.size <= this.chunkSize) {
                await this._uploadFile(file, key);
            }
            else {
                await this._uploadFileInChunks(file, key);
            }
            return key;
        }
        catch (error) {
            this.logger.error(`Error uploading file with key ${key} to azure:`, error, 'AzureStorageService.uploadFile');
            throw error;
        }
    }
    async _uploadFile(file, key) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(key);
        const buffer = Buffer.from(await file.arrayBuffer());
        await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: { blobContentType: file.type },
        });
    }
    async _uploadFileInChunks(file, key) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(key);
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
    getBlockId(index) {
        return btoa(index.toString().padStart(48, '0'));
    }
    _getFileKey(fileName) {
        const folder = mime_types_1.default.lookup(fileName).toString().split('/')[0] + 's';
        const now = Date.now();
        return `/${folder}/${(0, dayjs_1.default)().format('YYYY/MM/DD')}/${now}_${fileName}`;
    }
    async _streamToByteArray(stream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', (data) => chunks.push(data));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
        });
    }
};
exports.AzureStorageService = AzureStorageService;
exports.AzureStorageService = AzureStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        config_1.ConfigService,
        nestjs_i18n_1.I18nService])
], AzureStorageService);
//# sourceMappingURL=azure-storage.service.js.map