import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {IDepartment, IDepartmentList} from '../interface/department';
import { Post } from '../interface/post';
import { environment } from 'src/environments/environment';

const API_URL=environment.apiURL+'department/';

const httpOptions={
  headers: new HttpHeaders({
    'Accept':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  getAllDepartment(): Observable<any>{
    return this.http.get<any>(API_URL+'2findAll', httpOptions);
  }

  getDepartmentByName(key:string): Observable<any>{
    return this.http.get<any>(API_URL+`2findByDepartmentName?departmentName=`+key+`&page=0&Size=100`, httpOptions);
  }

  postDepartment(body:any):Observable<any>{
    return this.http.post<any>(API_URL+'2/',body, httpOptions);
  }

  putDepartment(body:any):Observable<any>{
    return this.http.put<any>(API_URL+'2/',body, httpOptions);
  }

  getDepartmentByID(departmentID:number){
    return this.http.get<any>(API_URL+'2getById?id='+departmentID, httpOptions);
  }

  deleteDepartment(departmentID:number){
    return this.http.delete<any>(API_URL+'response/'+departmentID, httpOptions);
  }
}

