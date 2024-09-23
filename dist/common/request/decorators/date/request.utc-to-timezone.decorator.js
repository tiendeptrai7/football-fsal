"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtcToTimezone = UtcToTimezone;
exports.StartOf = StartOf;
exports.EndOf = EndOf;
const class_transformer_1 = require("class-transformer");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function UtcToTimezone() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return value;
        const timeZone = process.env.TIMEZONE_DB || 'UTC';
        return (0, dayjs_1.default)(value).tz(timeZone).toISOString();
    });
}
function StartOf(unit) {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return value;
        const timeZone = process.env.TIMEZONE_DB || 'UTC';
        return (0, dayjs_1.default)(value).tz(timeZone).startOf(unit).toISOString();
    });
}
function EndOf(unit) {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return value;
        const timeZone = process.env.TIMEZONE_DB || 'UTC';
        return (0, dayjs_1.default)(value).tz(timeZone).endOf(unit).toISOString();
    });
}
//# sourceMappingURL=request.utc-to-timezone.decorator.js.map