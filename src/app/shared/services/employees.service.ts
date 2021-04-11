import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../Dto/employee-dto.component';
import { ServiceResultDto } from '../Dto/service-result.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _http: HttpClient) { }

  getAllEmployees():Observable<ServiceResultDto> {
    let url = `${environment.GetAllEmployees}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.get<ServiceResultDto>(url, { headers });
  }

  GetEmployeeById(id: number) :Observable<ServiceResultDto> {
    let url = `${environment.GetEmployeeById}/${id}`;
    let params = new HttpParams();
    params = params.append('id', id.toString());
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this._http.get<ServiceResultDto>(url, {headers});
  }
}
