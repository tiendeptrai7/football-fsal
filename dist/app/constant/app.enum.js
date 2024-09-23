"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECheckInStatus = exports.EHcpUpdateType = exports.EEventFormDetailFormat = exports.EEventFormDetailType = exports.EZaloMessageType = exports.EZaloEventTypes = exports.EReplyStatus = exports.EHCPType = exports.EEventStatus = exports.ESurveyFormStatus = exports.EFeedbackFormStatus = exports.EFormType = exports.EQuestionType = exports.EGender = exports.ESystemType = exports.EStatus = exports.ELocale = exports.APP_ENV = void 0;
var APP_ENV;
(function (APP_ENV) {
    APP_ENV["PROD"] = "production";
    APP_ENV["STAGING"] = "staging";
    APP_ENV["DEV"] = "development";
})(APP_ENV || (exports.APP_ENV = APP_ENV = {}));
var ELocale;
(function (ELocale) {
    ELocale["vi"] = "vi";
    ELocale["en"] = "en";
})(ELocale || (exports.ELocale = ELocale = {}));
var EStatus;
(function (EStatus) {
    EStatus[EStatus["inactive"] = 0] = "inactive";
    EStatus[EStatus["active"] = 1] = "active";
    EStatus[EStatus["pending"] = -1] = "pending";
})(EStatus || (exports.EStatus = EStatus = {}));
var ESystemType;
(function (ESystemType) {
    ESystemType[ESystemType["text"] = 0] = "text";
    ESystemType[ESystemType["number"] = 1] = "number";
    ESystemType[ESystemType["textarea"] = 2] = "textarea";
    ESystemType[ESystemType["password"] = 3] = "password";
    ESystemType[ESystemType["editor"] = 4] = "editor";
    ESystemType[ESystemType["json"] = 5] = "json";
    ESystemType[ESystemType["boolean"] = 6] = "boolean";
})(ESystemType || (exports.ESystemType = ESystemType = {}));
var EGender;
(function (EGender) {
    EGender["male"] = "male";
    EGender["female"] = "female";
})(EGender || (exports.EGender = EGender = {}));
var EQuestionType;
(function (EQuestionType) {
    EQuestionType[EQuestionType["single_choice"] = 1] = "single_choice";
    EQuestionType[EQuestionType["multi_choice"] = 2] = "multi_choice";
    EQuestionType[EQuestionType["rating"] = 3] = "rating";
    EQuestionType[EQuestionType["text"] = 4] = "text";
    EQuestionType[EQuestionType["percentage"] = 5] = "percentage";
})(EQuestionType || (exports.EQuestionType = EQuestionType = {}));
var EFormType;
(function (EFormType) {
    EFormType[EFormType["survey"] = 1] = "survey";
    EFormType[EFormType["feedback"] = 2] = "feedback";
})(EFormType || (exports.EFormType = EFormType = {}));
var EFeedbackFormStatus;
(function (EFeedbackFormStatus) {
    EFeedbackFormStatus[EFeedbackFormStatus["success"] = 1] = "success";
    EFeedbackFormStatus[EFeedbackFormStatus["expired"] = 2] = "expired";
    EFeedbackFormStatus[EFeedbackFormStatus["inprogress"] = 3] = "inprogress";
})(EFeedbackFormStatus || (exports.EFeedbackFormStatus = EFeedbackFormStatus = {}));
var ESurveyFormStatus;
(function (ESurveyFormStatus) {
    ESurveyFormStatus[ESurveyFormStatus["success"] = 1] = "success";
    ESurveyFormStatus[ESurveyFormStatus["expired"] = 2] = "expired";
    ESurveyFormStatus[ESurveyFormStatus["inprogress"] = 3] = "inprogress";
})(ESurveyFormStatus || (exports.ESurveyFormStatus = ESurveyFormStatus = {}));
var EEventStatus;
(function (EEventStatus) {
    EEventStatus[EEventStatus["inprogress"] = 1] = "inprogress";
    EEventStatus[EEventStatus["upcoming"] = 2] = "upcoming";
    EEventStatus[EEventStatus["expired"] = 3] = "expired";
})(EEventStatus || (exports.EEventStatus = EEventStatus = {}));
var EHCPType;
(function (EHCPType) {
    EHCPType[EHCPType["hcp"] = 1] = "hcp";
    EHCPType[EHCPType["referral"] = 2] = "referral";
})(EHCPType || (exports.EHCPType = EHCPType = {}));
var EReplyStatus;
(function (EReplyStatus) {
    EReplyStatus[EReplyStatus["pending"] = 1] = "pending";
    EReplyStatus[EReplyStatus["agree"] = 2] = "agree";
    EReplyStatus[EReplyStatus["reject"] = 3] = "reject";
})(EReplyStatus || (exports.EReplyStatus = EReplyStatus = {}));
var EZaloEventTypes;
(function (EZaloEventTypes) {
    EZaloEventTypes["user_send_text"] = "user_send_text";
    EZaloEventTypes["user_send_gif"] = "user_send_gif";
    EZaloEventTypes["user_send_image"] = "user_send_image";
    EZaloEventTypes["user_send_link"] = "user_send_link";
    EZaloEventTypes["user_send_audio"] = "user_send_audio";
    EZaloEventTypes["user_send_video"] = "user_send_video";
    EZaloEventTypes["user_send_sticker"] = "user_send_sticker";
    EZaloEventTypes["user_send_location"] = "user_send_location";
    EZaloEventTypes["user_send_business_card"] = "user_send_business_card";
    EZaloEventTypes["user_send_file"] = "user_send_file";
    EZaloEventTypes["oa_send_text"] = "oa_send_text";
    EZaloEventTypes["oa_send_image"] = "oa_send_image";
    EZaloEventTypes["oa_send_gif"] = "oa_send_gif";
    EZaloEventTypes["oa_send_list"] = "oa_send_list";
    EZaloEventTypes["oa_send_file"] = "oa_send_file";
    EZaloEventTypes["oa_send_sticker"] = "oa_send_sticker";
})(EZaloEventTypes || (exports.EZaloEventTypes = EZaloEventTypes = {}));
var EZaloMessageType;
(function (EZaloMessageType) {
    EZaloMessageType["text"] = "text";
    EZaloMessageType["voice"] = "voice";
    EZaloMessageType["photo"] = "photo";
    EZaloMessageType["GIF"] = "GIF";
    EZaloMessageType["link"] = "link";
    EZaloMessageType["links"] = "links";
    EZaloMessageType["sticker"] = "sticker";
    EZaloMessageType["location"] = "location";
})(EZaloMessageType || (exports.EZaloMessageType = EZaloMessageType = {}));
var EEventFormDetailType;
(function (EEventFormDetailType) {
    EEventFormDetailType["default"] = "default";
    EEventFormDetailType["custom"] = "custom";
})(EEventFormDetailType || (exports.EEventFormDetailType = EEventFormDetailType = {}));
var EEventFormDetailFormat;
(function (EEventFormDetailFormat) {
    EEventFormDetailFormat["hco"] = "hco";
    EEventFormDetailFormat["specialty"] = "specialty";
    EEventFormDetailFormat["gender"] = "gender";
    EEventFormDetailFormat["phone"] = "phone";
    EEventFormDetailFormat["name"] = "name";
    EEventFormDetailFormat["dob"] = "dob";
    EEventFormDetailFormat["title"] = "title";
    EEventFormDetailFormat["multiple_choice"] = "multiple_choice";
    EEventFormDetailFormat["text"] = "text";
    EEventFormDetailFormat["single_choice"] = "single_choice";
    EEventFormDetailFormat["percentage"] = "percentage";
    EEventFormDetailFormat["dropdown"] = "dropdown";
    EEventFormDetailFormat["date"] = "date";
    EEventFormDetailFormat["file_upload"] = "file_upload";
})(EEventFormDetailFormat || (exports.EEventFormDetailFormat = EEventFormDetailFormat = {}));
var EHcpUpdateType;
(function (EHcpUpdateType) {
    EHcpUpdateType[EHcpUpdateType["system"] = 1] = "system";
    EHcpUpdateType[EHcpUpdateType["event"] = 2] = "event";
})(EHcpUpdateType || (exports.EHcpUpdateType = EHcpUpdateType = {}));
var ECheckInStatus;
(function (ECheckInStatus) {
    ECheckInStatus[ECheckInStatus["not_check_in"] = 0] = "not_check_in";
    ECheckInStatus[ECheckInStatus["check_in"] = 1] = "check_in";
})(ECheckInStatus || (exports.ECheckInStatus = ECheckInStatus = {}));
//# sourceMappingURL=app.enum.js.map