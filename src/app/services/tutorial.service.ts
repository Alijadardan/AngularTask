import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  baseUrl = "https://movitask-webapi-qc.azurewebsites.net/api/AppInfo";

  constructor(private http: HttpClient) { }

  getInfo() {
    return this.http.get<any>(this.baseUrl + "/GetTutorial", {
        headers: new HttpHeaders({
                  'content-encoding': 'gzip',
                  'content-type': 'text/plain; charset=utf-8',
                  'transfer-encoding': 'chunked',
                  'vary': 'Accept-Encoding', 
                  'x-powered-by': 'ASP.NET',
                  'accept': 'text/plain',
                  'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                  'responseType': 'text',})
    });
  }
}
