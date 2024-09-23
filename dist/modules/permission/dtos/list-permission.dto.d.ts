import { Permission } from '../repository/entities/permission.entity';
export declare class ListPermissionDto {
    data: {
        [key: string]: Permission[];
    };
}
