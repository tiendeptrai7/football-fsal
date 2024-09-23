"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padStart = exports.isEmpty = void 0;
exports.wrapPagination = wrapPagination;
exports.parseJson = parseJson;
exports.objOmit = objOmit;
exports.deepObjOmit = deepObjOmit;
exports.chunk = chunk;
exports.orderBy = orderBy;
function wrapPagination(data, totalCount, paginationCfg) {
    return {
        data: data,
        total_pages: Math.ceil(totalCount / paginationCfg.limit),
        limit: paginationCfg.limit,
        page: paginationCfg.page,
        total_records: totalCount,
    };
}
function parseJson(input) {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return null;
    }
}
const isEmpty = (value) => {
    return (value == null || (typeof value === 'string' && value.trim().length === 0));
};
exports.isEmpty = isEmpty;
function objOmit(obj, keysToOmit) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && !keysToOmit.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
function deepObjOmit(obj, keysToOmit, condition) {
    const result = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!keysToOmit.includes(key) &&
                (!condition || !condition(key, obj[key]))) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = deepObjOmit(obj[key], keysToOmit, condition);
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
    }
    return result;
}
function chunk(arr, chunkSize = 1, cache = []) {
    const tmp = [...arr];
    if (chunkSize <= 0)
        return cache;
    while (tmp.length)
        cache.push(tmp.splice(0, chunkSize));
    return cache;
}
const padStart = (str, length, padChar = '') => {
    if (str.length >= length) {
        return str;
    }
    const paddingLength = length - str.length;
    const padding = padChar.repeat(paddingLength);
    return padding + str;
};
exports.padStart = padStart;
function orderBy(collection, iterates, orders) {
    if (!Array.isArray(collection)) {
        return [];
    }
    iterates = iterates || [(item) => item];
    orders = orders || iterates.map(() => 'asc');
    iterates = iterates.map((iteratee) => {
        if (typeof iteratee === 'function') {
            return iteratee;
        }
        else if (typeof iteratee === 'string') {
            return (item) => item[iteratee];
        }
        else {
            return (item) => item;
        }
    });
    return collection.sort((a, b) => {
        for (let i = 0; i < iterates.length; i++) {
            const iteratee = iterates[i];
            const order = orders[i];
            const valueA = iteratee(a);
            const valueB = iteratee(b);
            if (valueA < valueB) {
                return order === 'asc' ? -1 : 1;
            }
            else if (valueA > valueB) {
                return order === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });
}
//# sourceMappingURL=object.util.js.map