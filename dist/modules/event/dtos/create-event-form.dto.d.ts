import { EEventFormDetailFormat, EEventFormDetailType, EStatus } from '@app/constant/app.enum';
export declare class CreateEventFormDto {
    name: string;
    consent: string;
    status: EStatus;
    event_form_details: EventFormDetailDto[];
}
export declare class EventFormDetailDto {
    id: number;
    content: string;
    type: EEventFormDetailType;
    format: EEventFormDetailFormat;
    is_required: EStatus;
    event_form_options: EventFormOptionDto[];
}
export declare class EventFormOptionDto {
    id: number;
    content: string;
    require_input: EStatus;
}
export declare class SubmitAccompanyingGuestDto {
    event_guest_id: number;
    event_registration_info: EventRegistrationInfoDto[];
}
export declare class EventRegistrationInfoDto {
    event_form_detail_id: number;
    value: string;
    content: string;
    event_registration_option: EventRegistrationOptionDto[];
}
export declare class EventRegistrationOptionDto {
    event_form_option_id: number;
    value: string;
    content: string;
}
