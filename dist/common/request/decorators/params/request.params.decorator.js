"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = exports.AUser = void 0;
const common_1 = require("@nestjs/common");
exports.AUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.user;
});
exports.Id = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.__id;
});
//# sourceMappingURL=request.params.decorator.js.map