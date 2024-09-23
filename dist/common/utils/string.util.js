"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECharset = void 0;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.capitalizeText = capitalizeText;
exports.generateCode = generateCode;
exports.stringReplacer = stringReplacer;
exports.formatPrice = formatPrice;
exports.normalizePhone = normalizePhone;
exports.insertNewlinesAfterWords = insertNewlinesAfterWords;
exports.upperCaseFirstLetter = upperCaseFirstLetter;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPassword(plainText) {
    return await bcrypt_1.default.hash(plainText, 12);
}
async function comparePassword(password, storedHash) {
    return await bcrypt_1.default.compare(password, storedHash);
}
function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
var ECharset;
(function (ECharset) {
    ECharset["numbers"] = "numbers";
    ECharset["alphabetic"] = "alphabetic";
    ECharset["alphanumeric"] = "alphanumeric";
})(ECharset || (exports.ECharset = ECharset = {}));
function generateCode(options) {
    const charsets = {
        numbers: '0123456789',
        alphabetic: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        alphanumeric: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    };
    const charset = charsets[options.charset];
    let str = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        str += charset.charAt(randomIndex);
    }
    str = (options?.prefix || '') + str + (options?.postfix || '');
    if (options?.isUpperCase) {
        str = str.toLocaleUpperCase();
    }
    return str;
}
function stringReplacer(template, replacer) {
    return template.replace(/%(\w+)?%/g, (_, $2) => replacer[$2]);
}
function formatPrice(value) {
    return new Intl.NumberFormat('vi-VN').format(+value) + 'đ';
}
function normalizePhone(phone) {
    if (!phone)
        return phone;
    if (phone.startsWith('0')) {
        phone = phone.replace(/^0/, '84');
    }
    else if (phone.startsWith('+84')) {
        phone = phone.replace(/^\+84/, '84');
    }
    return phone;
}
function insertNewlinesAfterWords(input, wordInterval) {
    const words = input.split(' ');
    for (let i = wordInterval; i < words.length; i += wordInterval + 1) {
        words.splice(i, 0, '\n');
    }
    return words.join(' ');
}
function upperCaseFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
//# sourceMappingURL=string.util.js.map