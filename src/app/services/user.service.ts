import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Company from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "https://movitask-webapi-qc.azurewebsites.net/api/User";
  data = "{\"username\":\""+ "Eduarto112" +"\",\"password\":\""+ "Admin123*" +"\"}";
  company = "";

  constructor(private http: HttpClient) { }

  getCompanies(username, password){
    this.data = "{\"username\":\""+ "Eduarto112" +"\",\"password\":\""+ "Admin123*" +"\"}";
   return this.http.post<any>(this.baseUrl+"/Login", this.data , {headers: new HttpHeaders({'Content-Type': 'application/json'}),
   observe: 'response'});
  }

  getToken(value){
    this.company = value;
    return this.http.post<any>(this.baseUrl+"/GEtToken/"+value , this.data, {headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response'});
  }

  getUserDetails(){
    return this.http.post<any>(this.baseUrl+"/GEtToken/"+this.company , this.data, {headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response'});
  }
}
