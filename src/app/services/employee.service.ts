import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const API_URL=environment.apiURL+'employee/';

const httpOptions={
  headers: new HttpHeaders({
    'Accept':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  constructor(private http:HttpClient) { }

  getAllEmployees(): Observable<any>{
    return this.http.get<any>(API_URL+'2findAll', httpOptions);
  }
}
