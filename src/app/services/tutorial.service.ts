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
                  'Content-Type': 'text/plain; charset=utf-8',
                  'Content-Encoding': 'gzip',
                  'Vary': 'Accept-Encoding',
                  'Server': 'Microsoft-IIS/10.0',
                  'X-Powered-By': 'ASP.NET',
                  'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                  'responseType': 'text',})
    });
  }
}
