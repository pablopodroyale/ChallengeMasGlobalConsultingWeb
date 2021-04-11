import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _http: HttpClient) { }

  getAllEmployees() {

    let url = `${environment.GetAllEmployees}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.get(url, { headers });
  }

  GetEmployeeById(id: number) {
    let url = `${environment.GetEmployeeById}/${id}`;
    let params = new HttpParams();
    params = params.append('id', id.toString());
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this._http.get(url, {headers});
  }
}
