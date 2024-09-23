"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyQueryPaging = applyQueryPaging;
exports.extractSorting = extractSorting;
exports.applyQuerySorting = applyQuerySorting;
exports.applyQueryMonthRange = applyQueryMonthRange;
exports.applyQueryPeriod = applyQueryPeriod;
exports.applyQueryDayRange = applyQueryDayRange;
const dayjs_1 = __importDefault(require("dayjs"));
function applyQueryPaging(param, query, isRaw = false) {
    if (param.limit && param.page) {
        if (!isRaw) {
            query.take(param.limit).skip(param.limit * (param.page - 1));
        }
        else {
            query.limit(param.limit).offset(param.limit * (param.page - 1));
        }
    }
}
function extractSorting(value) {
    const [sortKey, sortDir] = value.split(' ');
    return {
        key: sortKey,
        dir: sortDir.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
    };
}
function applyQuerySorting(value, query, alias, isAddOrder = false) {
    const sortingInfo = extractSorting(value);
    const { key: sortKey, dir: sortDir } = sortingInfo;
    if (isAddOrder) {
        query.addOrderBy(alias ? alias + '.' + sortKey : sortKey, sortDir);
    }
    else {
        query.orderBy(alias ? alias + '.' + sortKey : sortKey, sortDir);
    }
}
function applyQueryMonthRange(params, query, config) {
    if (!params.date_to) {
        params.date_to = (0, dayjs_1.default)(params.date_from).endOf('month').toDate();
    }
    params.date_from = (0, dayjs_1.default)(params.date_from).startOf('month').toDate();
    applyQueryPeriod(params, query, config);
}
function applyQueryPeriod(params, query, config) {
    const from = params?.date_from;
    const to = params?.date_to;
    const alias = config.alias ? config.alias + '.' : '';
    if (from && to) {
        query.andWhere(`${alias}${config.column} BETWEEN :from AND :to`, {
            from,
            to,
        });
    }
    else if (from) {
        query.andWhere(`${alias}${config.column} >= :from`, { from });
    }
    else if (to) {
        query.andWhere(`${alias}${config.column} <= :to`, { to });
    }
}
function applyQueryDayRange(date, query, config) {
    if (date) {
        const date_from = (0, dayjs_1.default)(date).startOf('day').toDate();
        const date_to = (0, dayjs_1.default)(date).endOf('day').toDate();
        applyQueryPeriod({ date_from, date_to }, query, config);
    }
}
//# sourceMappingURL=query.helper.js.map