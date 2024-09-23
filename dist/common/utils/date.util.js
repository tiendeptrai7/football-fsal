"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateVN = formatDateVN;
exports.greaterThanNow = greaterThanNow;
exports.diffMinutes = diffMinutes;
exports.startOfDay = startOfDay;
exports.endOfDay = endOfDay;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
function formatDateVN(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) {
        return null;
    }
    return (0, dayjs_1.default)(date).utcOffset(7).format(format);
}
function greaterThanNow(date, days) {
    return Math.abs((0, dayjs_1.default)(date).diff((0, dayjs_1.default)(), 'day')) >= days;
}
function diffMinutes(dt1, dt2) {
    return (0, dayjs_1.default)(dt2).diff((0, dayjs_1.default)(dt1), 'minutes');
}
function startOfDay(date) {
    return (0, dayjs_1.default)(date).tz('UTC').startOf('date').toISOString();
}
function endOfDay(date) {
    return (0, dayjs_1.default)(date).tz('UTC').endOf('date').toISOString();
}
//# sourceMappingURL=date.util.js.map