import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Task from '../models/task';
import { BehaviorSubject } from 'rxjs';
import Anagrafiche from'../models/Anagrafiche';
import TaskType from '../models/taskType';
import TaskStatus from '../models/taskStatus';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  baseUrl = "https://movitask-webapi-qc.azurewebsites.net/api/Task";
  Url = "https://movitask-webapi-qc.azurewebsites.net/api";

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

  getAnagrafiche(){
    return this.http.get<Anagrafiche>(this.Url+'/Anagrafiche/GetAll', {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  getTaskType(){
    return this.http.get<TaskType>(this.Url+'/TaskType/GetAll', {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  getTaskStatus(){
    return this.http.get<TaskStatus>(this.Url+'/TaskStatus/GetAll', {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  createTask(data: Task) {
    return this.http.post(this.baseUrl+"/Add", {
      "idAnagrafica": data.idAnagrafica,
      "startDate": data.startDate,
      "endDate": data.endDate,
      "reminderDate": data.endDate,
      "subject": data.subject,
      "priority": 1,
      "idTaskType": data.idTaskType,
      "taskColor": data.taskColor,
      "idTaskStatus": data.idTaskStatus,
      "note": data.note,
      "idTaskGest": 0,
      "idTaskFrom": 0
    } , {headers: new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

  updateTask(id, params) {
    let y: number = +id;
    let userId: number = +localStorage.getItem('userid');
    return this.http.put(this.baseUrl+"/Update", {
      "idTask": y,
      "idAnagrafica": params.idAnagrafica,
      "startDate": params.startDate,
      "endDate": params.endDate,
      "reminderDate": params.endDate,
      "subject": params.subject,
      "priority": 1,
      "idTaskType": params.idTaskType,
      "taskColor": params.color,
      "idTaskStatus": params.idTaskStatus,
      "note": params.note,
      "idTaskGest": 0,
      "idTaskFrom": 0,
      "idUser": userId,
      "canBeDeleted": true,
      "timeIns": params.startDate,
      "timeMod": new Date
    } , {headers: new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    })});
  }

}
