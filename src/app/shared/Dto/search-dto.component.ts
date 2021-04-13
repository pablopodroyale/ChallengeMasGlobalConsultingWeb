import { FilterEmployeeDto } from './filter-employee-dto.component';

export class SearchDto{
    PageLength:number;
    Asc:boolean;
    Id:number;

    /**
     *
     */
    constructor() {
      this.PageLength = 1;
      this.Asc = true;
    }
}