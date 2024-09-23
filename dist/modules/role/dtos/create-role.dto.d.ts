import { EStatus } from '@app/constant/app.enum';
export declare class CreateRoleDto {
    name: string;
    slug: string;
    status: EStatus;
    permission_ids: number[];
}
