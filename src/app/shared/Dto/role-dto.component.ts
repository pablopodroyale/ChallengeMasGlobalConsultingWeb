export class RoleDto {
    roleId: number;
    roleName: string;
    roleDescription: string;

    /**
     *
     */
    constructor(item: any) {
        this.roleId = item.roleId;
        this.roleName = item.roleName;
        this.roleDescription = item.roleDescription;
    }
}