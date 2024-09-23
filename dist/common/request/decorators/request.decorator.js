"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransId = exports.ReqAuthUser = exports.RequestTimeout = void 0;
const request_constant_1 = require("../constants/request.constant");
const common_1 = require("@nestjs/common");
const RequestTimeout = (seconds) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(request_constant_1.REQUEST_CUSTOM_TIMEOUT_META_KEY, true), (0, common_1.SetMetadata)(request_constant_1.REQUEST_CUSTOM_TIMEOUT_VALUE_META_KEY, seconds * 1000));
};
exports.RequestTimeout = RequestTimeout;
exports.ReqAuthUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.user;
});
exports.TransId = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.__id;
});
//# sourceMappingURL=request.decorator.js.map