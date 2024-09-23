"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGender = exports.AppZaloEventTypes = exports.INCREMENT_CODE = exports.DATE_FORMAT_REGEX = exports.USER_NAME_REGEX = exports.STRONG_PASSWORD_REGEX = exports.URL_REGEX = exports.CODE_REGEX = exports.SLUG_REGEX = exports.PHONE_REGEX = exports.VERIFY_EMAIL_REGEX = void 0;
const app_enum_1 = require("./app.enum");
exports.VERIFY_EMAIL_REGEX = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
exports.PHONE_REGEX = /(^\(?\+?(84|0)(\s?|)?(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-46-9]|2[0-9]{2}|24|28)\)?\s?)?[0-9]{7,8}$/;
exports.SLUG_REGEX = /^[a-zA-Z0-9-_]+$/;
exports.CODE_REGEX = /^[a-zA-Z0-9]+$/;
exports.URL_REGEX = /(((http|https):\/\/)|(\/)|(..\/))(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
exports.STRONG_PASSWORD_REGEX = /^(?!.*\s)(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,60}$/;
exports.USER_NAME_REGEX = /^[A-Za-z0-9]{4,20}$/;
exports.DATE_FORMAT_REGEX = /^\d{2}:\d{2}:\d{2} \d{4}\/\d{2}\/\d{2}$/;
exports.INCREMENT_CODE = {
    RECAP: 'INCREMENT_CODE_RECAP',
    EVENT: 'INCREMENT_CODE_EVENT',
    REMINDER: 'INCREMENT_CODE_REMINDER',
    NEWS: 'INCREMENT_CODE_NEWS',
    FEEDBACK: 'INCREMENT_CODE_FEEDBACK',
    SURVEY: 'INCREMENT_CODE_SURVEY',
    HCP_REFERRAL: 'INCREMENT_CODE_HCP_REFERRAL',
    FORM_MANAGEMENT: 'FORM_MANAGEMENT',
};
exports.AppZaloEventTypes = {
    USER_SEND_TEXT: app_enum_1.EZaloEventTypes.user_send_text,
    USER_SEND_GIF: app_enum_1.EZaloEventTypes.user_send_gif,
    USER_SEND_IMAGE: app_enum_1.EZaloEventTypes.user_send_image,
    USER_SEND_LINK: app_enum_1.EZaloEventTypes.user_send_link,
    USER_SEND_AUDIO: app_enum_1.EZaloEventTypes.user_send_audio,
    USER_SEND_VIDEO: app_enum_1.EZaloEventTypes.user_send_video,
    USER_SEND_STICKER: app_enum_1.EZaloEventTypes.user_send_sticker,
    USER_SEND_LOCATION: app_enum_1.EZaloEventTypes.user_send_location,
    USER_SEND_BUSINESS_CARD: app_enum_1.EZaloEventTypes.user_send_business_card,
    USER_SEND_FILE: app_enum_1.EZaloEventTypes.user_send_file,
    OA_SEND_TEXT: app_enum_1.EZaloEventTypes.oa_send_text,
    OA_SEND_IMAGE: app_enum_1.EZaloEventTypes.oa_send_image,
    OA_SEND_GIFT: app_enum_1.EZaloEventTypes.oa_send_gif,
    OA_SEND_LIST: app_enum_1.EZaloEventTypes.oa_send_list,
    OA_SEND_FILE: app_enum_1.EZaloEventTypes.oa_send_file,
    OA_SEND_STICKER: app_enum_1.EZaloEventTypes.oa_send_sticker,
};
exports.AppGender = [
    { value: app_enum_1.EGender.female, content: 'Nữ' },
    { value: app_enum_1.EGender.male, content: 'Nam' },
];
//# sourceMappingURL=app.constant.js.map