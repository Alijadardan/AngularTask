import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Task from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = "https://movitask-webapi-qc.azurewebsites.net/api/Task";

  constructor(private http: HttpClient) { }

  getTasks(params) {
    return this.http.get<any>(this.baseUrl + "/GetAll", {
      params , headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      })
    });
  }

  getTaskById(id: string) {
    return this.http.get<any>(this.baseUrl+'/GetById/'+id, {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  createTask(data: Task) {
    return this.http.post(this.baseUrl+"/Add", {
      "idAnagrafica": 0,
      "startDate": data.startDate,
      "endDate": data.endDate,
      "reminderDate": data.endDate,
      "subject": data.subject,
      "priority": 0,
      "idTaskType": 0,
      "taskColor": data.taskColor,
      "idTaskStatus": 0,
      "note": data.note,
      "idTaskGest": 0,
      "idTaskFrom": 0
    } , {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  updateTask(id, params) {
    return this.http.put(this.baseUrl+"/Update", {
      "idTask": id,
      "idAnagrafica": 0,
      "startDate": params.starDate,
      "endDate": params.endDate,
      "reminderDate": params.endDate,
      "subject": params.subject,
      "priority": 0,
      "idTaskType": 0,
      "taskColor": params.color,
      "idTaskStatus": 0,
      "note": params.note,
      "idTaskGest": 0,
      "idTaskFrom": 0,
      "idUser": 0,
      "canBeDeleted": true,
      "timeIns": "2020-09-15T15:19:15.832Z",
      "timeMod": "2020-09-15T15:19:15.832Z"
    } , {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }
   
}
