import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmployeeDto } from '../shared/Dto/employee-dto.component';
import { EmployeesService } from '../shared/services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employees: EmployeeDto[] = [];
  public dtOptions: DataTables.Settings;
  public dtTrigger: Subject<any> ;
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  employeeId:number;

  constructor(public employeesService: EmployeesService, private toast: ToastrService) {
      this.employees = [];
      this.dtOptions = {};
      this.dtTrigger = new Subject<any>();
   }

  ngOnInit(): void {
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const id = parseFloat(data[0]) || 0; // use data for the id column
      if (isNaN(this.employeeId)){
        return true;
      }
      return false;
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    
    this.getAllEmployees();
  }

  async getAllEmployees() {
    await this.employeesService.getAllEmployees().toPromise()
      .then((res: any) => {
        if (res.succedded) {
          res.obj.forEach(element => {
            let employee: EmployeeDto = new EmployeeDto(element);
            this.employees.push(employee);
          });
          this.dtTrigger.next();
        } else {
          let errors = res.errors.map(x => x.description)
          this.toast.error(errors.join(', \n'));
          console.log(res.errors)
        }
      })
      .catch((error) => {
        console.log(error);
        this.toast.error("Connection Error");
      });
    ;
  }

  async GetEmployeeById(id: number) {
    await this.employeesService.GetEmployeeById(id).toPromise()
      .then((res: any) => {
        if (res.succedded) {
        
          let employee: EmployeeDto = new EmployeeDto(res.obj);
          this.employees.push(employee);
        
          this.dtTrigger.next();
        } else {
          let errors = res.errors.map(x => x.description)
          this.toast.error(errors.join(', \n'));
          console.log(res.errors)
        }
      })
      .catch((error) => {
        console.log(error);
        this.toast.error("Connection Error");
      });
    ;
  }

  filterById(): void {
    this.GetEmployeeById(this.employeeId);
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
      dtInstance.draw();
    });
  }

  clearFilters(): void {
    this.getAllEmployees();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
      dtInstance.draw();
    });
  }

  ngOnDestroy(): void {
    // We remove the last function in the global ext search array so we do not add the fn each time the component is drawn
    // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
    // handling this global variable
    $.fn['dataTable'].ext.search.pop();
  }
}
