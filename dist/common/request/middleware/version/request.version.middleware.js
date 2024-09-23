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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestVersionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let RequestVersionMiddleware = class RequestVersionMiddleware {
    configService;
    versioningEnable;
    versioningGlobalPrefix;
    versioningPrefix;
    versioningVersion;
    repoVersion;
    constructor(configService) {
        this.configService = configService;
        this.versioningGlobalPrefix =
            this.configService.get('app.globalPrefix');
        this.versioningEnable = this.configService.get('app.versioning.enable');
        this.versioningPrefix = this.configService.get('app.versioning.prefix');
        this.versioningVersion = this.configService.get('app.versioning.version');
        this.repoVersion = this.configService.get('app.repoVersion');
    }
    async use(req, _res, next) {
        const originalUrl = req.originalUrl;
        let version = this.versioningVersion;
        if (this.versioningEnable &&
            originalUrl.startsWith(`${this.versioningGlobalPrefix}/${this.versioningPrefix}`)) {
            const url = originalUrl.split('/');
            version = url[2].replace(this.versioningPrefix, '');
        }
        req.__version = version;
        req.__repoVersion = this.repoVersion;
        next();
    }
};
exports.RequestVersionMiddleware = RequestVersionMiddleware;
exports.RequestVersionMiddleware = RequestVersionMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RequestVersionMiddleware);
//# sourceMappingURL=request.version.middleware.js.map