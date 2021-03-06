import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  baseUrl = "https://movitask-webapi-qc.azurewebsites.net/api/AppInfo";

  constructor(private http: HttpClient) { }

  getInfo() {
    const httpOptionsText = {
      headers: new HttpHeaders({
        Accept: "text/plain",
        "Content-Type": "text/plain",
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }),
      responseType: "text" as "json"
    };
    return this.http.get<any>(this.baseUrl + "/GetTutorial",
    httpOptionsText
    );
  }
}
