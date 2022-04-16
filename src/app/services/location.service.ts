import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const API_URL=environment.apiURL+'locations/';

const httpOptions={
  headers: new HttpHeaders({
    'Accept':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http:HttpClient) { }

  getAllLocations(): Observable<any>{
    return this.http.get<any>(API_URL+'2findAll', httpOptions);
  }
}
