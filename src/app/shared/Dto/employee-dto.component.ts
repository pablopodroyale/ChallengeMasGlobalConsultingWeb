import {RoleDto} from './role-dto.component'

export class EmployeeDto {
    id: number;
    name: string;
    role: RoleDto;
    hourlySalary: number;
    monthlySalary:number;
    calculatedAnnualSalary:number;

    /**
     *
     */
    constructor(item:any) {
       this.id = item.id;
       this.name = item.name;
       this.role = new RoleDto(item.role);
       this.hourlySalary = item.hourlySalary;
       this.monthlySalary = item.monthlySalary;
       this.calculatedAnnualSalary = item.calculatedAnnualSalary;
    }
}