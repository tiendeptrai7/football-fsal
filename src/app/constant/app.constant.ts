import { EGender, EZaloEventTypes } from './app.enum';

export const VERIFY_EMAIL_REGEX =
  '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

export const PHONE_REGEX =
  /(^\(?\+?(84|0)(\s?|)?(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-46-9]|2[0-9]{2}|24|28)\)?\s?)?[0-9]{7,8}$/;

export const SLUG_REGEX = /^[a-zA-Z0-9-_]+$/;

export const CODE_REGEX = /^[a-zA-Z0-9]+$/;

export const URL_REGEX =
  /(((http|https):\/\/)|(\/)|(..\/))(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export const STRONG_PASSWORD_REGEX =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,60}$/;

export const USER_NAME_REGEX = /^[A-Za-z0-9]{4,20}$/;

export const DATE_FORMAT_REGEX = /^\d{2}:\d{2}:\d{2} \d{4}\/\d{2}\/\d{2}$/;

export const INCREMENT_CODE = {
  RECAP: 'INCREMENT_CODE_RECAP',
  EVENT: 'INCREMENT_CODE_EVENT',
  REMINDER: 'INCREMENT_CODE_REMINDER',
  NEWS: 'INCREMENT_CODE_NEWS',
  FEEDBACK: 'INCREMENT_CODE_FEEDBACK',
  SURVEY: 'INCREMENT_CODE_SURVEY',
  HCP_REFERRAL: 'INCREMENT_CODE_HCP_REFERRAL',
  FORM_MANAGEMENT: 'FORM_MANAGEMENT',
};

export const AppZaloEventTypes = {
  USER_SEND_TEXT: EZaloEventTypes.user_send_text,
  USER_SEND_GIF: EZaloEventTypes.user_send_gif,
  USER_SEND_IMAGE: EZaloEventTypes.user_send_image,
  USER_SEND_LINK: EZaloEventTypes.user_send_link,
  USER_SEND_AUDIO: EZaloEventTypes.user_send_audio,
  USER_SEND_VIDEO: EZaloEventTypes.user_send_video,
  USER_SEND_STICKER: EZaloEventTypes.user_send_sticker,
  USER_SEND_LOCATION: EZaloEventTypes.user_send_location,
  USER_SEND_BUSINESS_CARD: EZaloEventTypes.user_send_business_card,
  USER_SEND_FILE: EZaloEventTypes.user_send_file,
  OA_SEND_TEXT: EZaloEventTypes.oa_send_text,
  OA_SEND_IMAGE: EZaloEventTypes.oa_send_image,
  OA_SEND_GIFT: EZaloEventTypes.oa_send_gif,
  OA_SEND_LIST: EZaloEventTypes.oa_send_list,
  OA_SEND_FILE: EZaloEventTypes.oa_send_file,
  OA_SEND_STICKER: EZaloEventTypes.oa_send_sticker,
};

export const AppGender = [
  { value: EGender.female, content: 'Nữ' },
  { value: EGender.male, content: 'Nam' },
];
