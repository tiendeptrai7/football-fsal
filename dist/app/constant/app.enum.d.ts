export declare enum APP_ENV {
    PROD = "production",
    STAGING = "staging",
    DEV = "development"
}
export declare enum ELocale {
    vi = "vi",
    en = "en"
}
export declare enum EStatus {
    inactive = 0,
    active = 1,
    pending = -1
}
export declare enum ESystemType {
    text = 0,
    number = 1,
    textarea = 2,
    password = 3,
    editor = 4,
    json = 5,
    boolean = 6
}
export declare enum EGender {
    male = "male",
    female = "female"
}
export declare enum EQuestionType {
    single_choice = 1,
    multi_choice = 2,
    rating = 3,
    text = 4,
    percentage = 5
}
export declare enum EFormType {
    survey = 1,
    feedback = 2
}
export declare enum EFeedbackFormStatus {
    success = 1,
    expired = 2,
    inprogress = 3
}
export declare enum ESurveyFormStatus {
    success = 1,
    expired = 2,
    inprogress = 3
}
export declare enum EEventStatus {
    inprogress = 1,
    upcoming = 2,
    expired = 3
}
export declare enum EHCPType {
    hcp = 1,
    referral = 2
}
export declare enum EReplyStatus {
    pending = 1,
    agree = 2,
    reject = 3
}
export declare enum EZaloEventTypes {
    user_send_text = "user_send_text",
    user_send_gif = "user_send_gif",
    user_send_image = "user_send_image",
    user_send_link = "user_send_link",
    user_send_audio = "user_send_audio",
    user_send_video = "user_send_video",
    user_send_sticker = "user_send_sticker",
    user_send_location = "user_send_location",
    user_send_business_card = "user_send_business_card",
    user_send_file = "user_send_file",
    oa_send_text = "oa_send_text",
    oa_send_image = "oa_send_image",
    oa_send_gif = "oa_send_gif",
    oa_send_list = "oa_send_list",
    oa_send_file = "oa_send_file",
    oa_send_sticker = "oa_send_sticker"
}
export declare enum EZaloMessageType {
    text = "text",
    voice = "voice",
    photo = "photo",
    GIF = "GIF",
    link = "link",
    links = "links",
    sticker = "sticker",
    location = "location"
}
export declare enum EEventFormDetailType {
    default = "default",
    custom = "custom"
}
export declare enum EEventFormDetailFormat {
    hco = "hco",
    specialty = "specialty",
    gender = "gender",
    phone = "phone",
    name = "name",
    dob = "dob",
    title = "title",
    multiple_choice = "multiple_choice",
    text = "text",
    single_choice = "single_choice",
    percentage = "percentage",
    dropdown = "dropdown",
    date = "date",
    file_upload = "file_upload"
}
export declare enum EHcpUpdateType {
    system = 1,
    event = 2
}
export declare enum ECheckInStatus {
    not_check_in = 0,
    check_in = 1
}
