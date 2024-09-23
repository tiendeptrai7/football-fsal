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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
let LogService = class LogService {
    constructor() { }
    getListLog() {
        const listFile = (0, fs_1.readdirSync)(path_1.default.resolve(process.cwd(), 'logs/debug'));
        const listLog = listFile.filter((file) => file.endsWith('.log'));
        listLog.sort().reverse();
        return { data: listLog };
    }
    readLogByName(logName) {
        const logPath = path_1.default.resolve(process.cwd(), 'logs/debug', `${logName}`);
        const isExists = (0, fs_1.existsSync)(logPath);
        if (!isExists)
            return [];
        const file = (0, fs_1.createReadStream)(logPath);
        return new common_1.StreamableFile(file);
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LogService);
//# sourceMappingURL=log.service.js.map