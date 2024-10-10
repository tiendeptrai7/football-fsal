export enum APP_ENV {
  PROD = 'production',
  STAGING = 'staging',
  DEV = 'development',
}

export enum ELocale {
  vi = 'vi',
  en = 'en',
}

export enum EStatus {
  inactive,
  active,
  pending = -1,
}

export enum EPosition {
  FW,
  GK,
  MF,
  DF,
}

export enum ESystemType {
  text,
  number,
  textarea,
  password,
  editor,
  json,
  boolean,
}

export enum EGender {
  male = 'male',
  female = 'female',
}

export enum EQuestionType {
  single_choice = 1,
  multi_choice,
  rating,
  text,
  percentage,
}

export enum EFormType {
  survey = 1,
  feedback,
}

export enum EFeedbackFormStatus {
  success = 1,
  expired = 2,
  inprogress = 3,
}

export enum ESurveyFormStatus {
  success = 1,
  expired = 2,
  inprogress = 3,
}

export enum EEventStatus {
  inprogress = 1,
  upcoming = 2,
  expired = 3,
}

export enum EHCPType {
  hcp = 1,
  referral,
}

export enum EReplyStatus {
  pending = 1,
  agree,
  reject,
}

export enum EZaloEventTypes {
  user_send_text = 'user_send_text',
  user_send_gif = 'user_send_gif',
  user_send_image = 'user_send_image',
  user_send_link = 'user_send_link',
  user_send_audio = 'user_send_audio',
  user_send_video = 'user_send_video',
  user_send_sticker = 'user_send_sticker',
  user_send_location = 'user_send_location',
  user_send_business_card = 'user_send_business_card',
  user_send_file = 'user_send_file',
  oa_send_text = 'oa_send_text',
  oa_send_image = 'oa_send_image',
  oa_send_gif = 'oa_send_gif',
  oa_send_list = 'oa_send_list',
  oa_send_file = 'oa_send_file',
  oa_send_sticker = 'oa_send_sticker',
}

export enum EZaloMessageType {
  text = 'text',
  voice = 'voice',
  photo = 'photo',
  GIF = 'GIF',
  link = 'link',
  links = 'links',
  sticker = 'sticker',
  location = 'location',
}

export enum EEventFormDetailType {
  default = 'default',
  custom = 'custom',
}

export enum EEventFormDetailFormat {
  //default
  hco = 'hco',
  specialty = 'specialty',
  gender = 'gender',
  phone = 'phone',
  name = 'name',
  dob = 'dob',
  title = 'title',
  //custom
  multiple_choice = 'multiple_choice',
  text = 'text',
  single_choice = 'single_choice',
  percentage = 'percentage',
  dropdown = 'dropdown',
  date = 'date',
  file_upload = 'file_upload',
}

export enum EHcpUpdateType {
  system = 1,
  event,
}

export enum ECheckInStatus {
  not_check_in = 0,
  check_in,
}
