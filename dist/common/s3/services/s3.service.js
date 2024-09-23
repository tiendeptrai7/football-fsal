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
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const custom_error_exception_1 = __importDefault(require("../../error/exceptions/custom-error.exception"));
const message_service_1 = require("../../message/services/message.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dayjs_1 = __importDefault(require("dayjs"));
const mime_types_1 = __importDefault(require("mime-types"));
const nestjs_i18n_1 = require("nestjs-i18n");
let S3Service = class S3Service {
    logger;
    configService;
    chunkSize = 5 * 1024 * 1024;
    s3;
    s3Message;
    constructor(logger, configService, i18nService) {
        this.logger = logger;
        this.configService = configService;
        this.s3 = new client_s3_1.S3Client({
            region: this.configService.get('s3.region'),
            endpoint: this.configService.get('s3.endpoint'),
            credentials: {
                accessKeyId: this.configService.get('s3.accessKeyId'),
                secretAccessKey: this.configService.get('s3.secretAccessKey'),
            },
        });
        this.s3Message = new message_service_1.MessageService(i18nService, 's3');
    }
    async getFile(key) {
        try {
            const item = await this.s3.send(new client_s3_1.GetObjectCommand({
                Bucket: this.configService.get('s3.bucketName'),
                Key: key,
            }));
            return item.Body.transformToByteArray();
        }
        catch (error) {
            this.logger.error(`Error while get file from S3 with key ${key}.`, error, 'S3Service.getFile');
            throw new custom_error_exception_1.default(400, 'FILE_NOT_FOUND', this.s3Message.get('FILE_NOT_FOUND'));
        }
    }
    async uploadFile(file, filename) {
        const key = this._getFileKey(filename);
        let uploadId;
        try {
            if (file.size <= this.chunkSize) {
                await this._uploadFile(file, key);
            }
            else {
                const params = {
                    Bucket: this.configService.get('s3.bucketName'),
                    Key: key,
                    ContentType: mime_types_1.default.lookup(filename).toString(),
                };
                const uploadId = await this.createMultipartUpload(params);
                const parts = await this.uploadMultipartChunks(key, file, uploadId, this.chunkSize);
                await this.completeMultipartUpload(key, uploadId, parts);
            }
            return key;
        }
        catch (error) {
            this.logger.error(`Error uploading file with key ${key} to S3:`, error, 'S3Service.uploadFile');
            if (uploadId) {
                await this.s3.send(new client_s3_1.AbortMultipartUploadCommand({
                    Bucket: this.configService.get('s3.bucketName'),
                    Key: key,
                    UploadId: uploadId,
                }));
            }
            throw error;
        }
    }
    async createMultipartUpload(params) {
        const response = await this.s3.send(new client_s3_1.CreateMultipartUploadCommand(params));
        return response.UploadId;
    }
    async uploadMultipartChunks(key, file, uploadId, chunkSize) {
        const parts = [];
        let startPosition = 0;
        let partNumber = 1;
        while (startPosition < file.size) {
            const chunk = file.slice(startPosition, startPosition + chunkSize);
            const part = await this.uploadMultipartChunk(key, chunk, uploadId, partNumber);
            parts.push(part);
            startPosition += chunkSize;
            partNumber++;
        }
        return parts;
    }
    async uploadMultipartChunk(key, chunk, uploadId, partNumber) {
        const params = {
            Bucket: this.configService.get('s3.bucketName'),
            Key: key,
            PartNumber: partNumber,
            UploadId: uploadId,
            Body: chunk,
        };
        const response = await this.s3.send(new client_s3_1.UploadPartCommand(params));
        return { ETag: response.ETag, PartNumber: partNumber };
    }
    async completeMultipartUpload(key, uploadId, parts) {
        const params = {
            Bucket: this.configService.get('s3.bucketName'),
            Key: key,
            UploadId: uploadId,
            MultipartUpload: { Parts: parts },
        };
        return await this.s3.send(new client_s3_1.CompleteMultipartUploadCommand(params));
    }
    async _uploadFile(file, key) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.configService.get('s3.bucketName'),
            Key: key,
            Body: buffer,
        });
        await this.s3.send(command);
    }
    _getFileKey(fileName) {
        const folder = mime_types_1.default.lookup(fileName).toString().split('/')[0] + 's';
        const now = Date.now();
        return `${folder}/${(0, dayjs_1.default)().format('YYYY/MM/DD')}/${now}_${fileName}`;
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        config_1.ConfigService,
        nestjs_i18n_1.I18nService])
], S3Service);
//# sourceMappingURL=s3.service.js.map