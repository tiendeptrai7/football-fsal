"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class CustomError extends common_1.HttpException {
    constructor(httpStatus, errorCode, message, data) {
        super({
            errorCode,
            message,
            data,
        }, httpStatus);
    }
}
exports.default = CustomError;
//# sourceMappingURL=custom-error.exception.js.map