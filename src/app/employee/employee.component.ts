import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmployeeDto } from '../shared/Dto/employee-dto.component';
import { EmployeesService } from '../shared/services/employees.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SearchDto } from '../shared/Dto/search-dto.component';
import { FilterEmployeeDto } from '../shared/Dto/filter-employee-dto.component';

@Component({
  selector: 'app-employee',
  templateUrl:'./employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employees: EmployeeDto[] = [];
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public table: any;
  public search:SearchDto;
  public filter:FilterEmployeeDto;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  employeeId: number;

  constructor(public employeesService: EmployeesService, private toast: ToastrService, private http: HttpClient,private appComponent: AppComponent) {
    this.employees = [];
    this.table = $('#idEmployeesTable');
    this.search = new SearchDto();
    // this.filter = new FilterEmployeeDto();
    // this.search.Filter = this.filter;
  }

  ngOnInit(): void {
    this.appComponent.setLoading(true);
    this.employees = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      search: true,
      paging: true
    };
    this.getAllEmployees(this.search);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance
      .then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
  }

  async getAllEmployees(search:SearchDto) {
    this.appComponent.setLoading(true);
    this.employeesService.getAllEmployees(search)
      .subscribe(
        data => {
          this.employees = data.obj != null ? data.obj : []
        },
        error => {
          this.toast.error("Connection Error");
        });
    this.appComponent.setLoading(false);
  }

  filterEmployees(): void {
    if (this.employeeId != undefined) {
      this.appComponent.setLoading(true);
      this.search.Id = this.employeeId;
      this.employeesService.getAllEmployees(this.search)
        .subscribe(
          data => {
            this.employees = []
            if (data.obj != null) {
              this.employees = data.obj
            }
          },
          error => {
            this.toast.error("Connection Error");
          });
    } else {
      this.toast.error("Select an Employee Id");
    }
    this.appComponent.setLoading(false);
  }

  getAll(): void {
    this.search.Id = null;
    this.getAllEmployees(this.search);
  }

  ngOnDestroy(): void {
    $.fn['dataTable'].ext.search.pop();
  }
}
