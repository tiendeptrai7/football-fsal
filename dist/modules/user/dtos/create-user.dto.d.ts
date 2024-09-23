import { EStatus } from '@app/constant/app.enum';
declare class ProfileDto {
    full_name: string;
    phone: string;
    upi: string;
}
export declare class CreateUserDto {
    username: string;
    email: string;
    status: EStatus;
    role_ids: number[];
    profile: ProfileDto;
}
export {};
