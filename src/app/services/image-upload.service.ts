import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TaskAllega from '../models/TaskAllega';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  baseUrl = "https://movitask-webapi-qc.azurewebsites.net/api/TaskAllega";

  constructor(private http: HttpClient) { }

  getImageById(id){
    return this.http.get<TaskAllega>(this.baseUrl+"/GetByTaskId/"+id, {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  addImage(id, imgBase64 : string){
    return this.http.post<TaskAllega>(this.baseUrl+"/Add", {
      "idTask": id,
      "oggetto": "Test Image",
      "allegato": imgBase64,
      "timeIns": "2020-09-24T12:47:12.214Z"
    } ,{headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Content-Type': 'application/json'
    })});
  }

  updateImage(id, imgBase64 : string){
    return this.http.put<TaskAllega>(this.baseUrl+"/Add", {
      "idTask": id,
      "oggetto": "Test Image",
      "allegato": imgBase64,
      "timeIns": "2020-09-24T12:47:12.214Z"
    } ,{headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      'Content-Type': 'application/json'
    })});
  }

  deleteImage(id){
    return this.http.delete<TaskAllega>(this.baseUrl + "/Delete/"+id, {headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
    })});
  }
}
