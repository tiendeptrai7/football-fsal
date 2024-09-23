import { AuthUser } from '@auth/types/auth.type';
import { User } from '@modules/user/repository/entities/user.entity';
import { FollowOADto, UpdateProfileDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';
export declare class UserPublicController {
    private readonly service;
    constructor(service: UserService);
    myProfile(user: AuthUser): Promise<User>;
    updateProfile(body: UpdateProfileDto, user: AuthUser): Promise<void>;
    followOA(body: FollowOADto, user: AuthUser): Promise<void>;
}
