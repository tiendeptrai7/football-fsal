import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: string;
}
export declare class ResetLockDto {
    id: string;
}
export declare class FollowOADto {
    zalo_follow_oa_id: string;
}
export declare class UpdateProfileDto {
    phone: string;
}
export {};
