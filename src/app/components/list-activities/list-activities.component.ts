import { listAnimation, fadeinAnimation } from './../../animations';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Task from 'src/app/models/task';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-activities',
  animations: [
    fadeinAnimation,
    listAnimation,
  ],
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.scss']
})
export class ListActivitiesComponent implements OnInit {
  tasks: Task[];
  isEmpty: boolean = false;
  isLoading: boolean = false;
  showPagination: boolean = false;
  error: "";
  params = {
    pageNumber: 1,
    pageSize: 10,
    totalPage: 0
  }
  lastSync = "";

  constructor(private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.currentPageNumber();
    this.retriveTasks();
  }

  test(){
    console.log("test");
  }

  retriveTasks() {
    if (localStorage.getItem('tasks' + this.params.pageNumber)) {
      this.retriveLocalTasks();
    } else {
      this.retriveHttpTasks();
    }
  }

  retriveLocalTasks() {
    let data = this.getLocalTasks();
    this.isLoading = true;
    this.showPagination = true;
    this.getDate();
    this.paginationTotalPage(data);
    this.emptyData(data);
  }

  retriveHttpTasks() {
    this.tasksService.getTasks(this.params).subscribe((data) => {
      this.setDate();
      if (data) {
        this.tasks = data.data;
        this.setLocalTasks(data);
        this.isLoading = true;
        this.showPagination = true;
        this.paginationTotalPage(data);
        this.emptyData(data);
      }
    },
      (error) => {
        this.error = error;
        this.isLoading = true;
      })
  }

  setDate() {
    let date = new Date;
    localStorage.setItem('logTime', date.toString());
    this.lastSync = date.toString();
  }

  getDate() {
    this.lastSync = localStorage.getItem('logTime');
  }

  setLocalTasks(data) {
    localStorage.setItem('tasks' + data.currentPage, JSON.stringify(data));
  }

  getLocalTasks() {
    let local = localStorage.getItem('tasks' + this.params.pageNumber);
    let data = JSON.parse(local);
    this.tasks = data.data;
    return data;
  }

  emptyData(data) {
    if (data.total == 0) {
      this.isEmpty = true;
    }
  }

  paginationTotalPage(data) {
    this.params.totalPage = data.total;
  }

  pageChanged(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }

  handlePageChange(event) {
    localStorage.setItem('currentPage', event);
    this.isLoading = false;
    this.showPagination = false;
    this.params.pageNumber = event;
    this.retriveTasks();
  }

  refreshList() {
    this.isLoading = false;
    this.showPagination = false;
    this.clearChache();
    this.retriveHttpTasks();
  }

  currentPageNumber() {
    if (localStorage.getItem('currentPage')) {
      this.params.pageNumber = parseInt(localStorage.getItem('currentPage'));
    } else {
      this.params.pageNumber = 1;
    }
  }

  clearChache() {
    let userToken = localStorage.getItem('userToken');
    let companies = localStorage.getItem('companies');
    let username = localStorage.getItem('username');
    let selectedCompany = localStorage.getItem('selectedCompanyName');
    let currentPage = localStorage.getItem('currentPage');
    localStorage.clear();
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('companies', companies);
    localStorage.setItem('username', username);
    localStorage.setItem('selectedCompanyName', selectedCompany);
    localStorage.setItem('currentPage', currentPage);
  }

  deleteTask(id, canbedeleted){
    if(!canbedeleted){
      Swal.fire({
        text: 'This Task can not be deleted',
        icon: 'error'
      });
    }else{
      let placeholder;
      Swal.fire({
        title: 'Are you sure you want to delete this item!',
        showCancelButton: true,
        confirmButtonText: `Delete`,
        cancelButtonText: `Cancel`,
        icon: 'question',
        confirmButtonColor: '#FF0000',
      }).then((result) => {
        if(result.isConfirmed){
          this.tasks = this.tasks.filter(function(obj){
            if(obj.idTask == id){
              placeholder = obj;
            }
            return obj.idTask !== id;
          });

          this.tasksService.deleteTask(id).subscribe({
            next: () => {
              console.log("Deleted");
            },
            error: error => {
              this.tasks.push(placeholder);
              Swal.fire({
                text: 'Something went Wrong',
                icon: 'error'
              });
            }
          });
        }
      })
    }
  }
}
