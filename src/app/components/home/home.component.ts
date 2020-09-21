import { UserService } from './../../services/user.service';
import { ListActivitiesComponent } from './../list-activities/list-activities.component';
import { TasksService } from '../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  companies: any[];
  selectedCompany;


  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("username");
    this.companies = JSON.parse(localStorage.getItem("companies"));
    this.selectedCompany = localStorage.getItem('selectedCompanyName');
  }

  changeCompany(id, name){
    let companies = localStorage.getItem('companies');
    localStorage.clear();
    localStorage.setItem('companies', companies);
    localStorage.setItem('selectedCompany', id);
    localStorage.setItem('selectedCompanyName', name);
    this.userservice.getToken(id).subscribe((data) => {
      localStorage.setItem('userToken', data.body.token);
      localStorage.setItem('username', data.body.username);
      location.reload();
    })
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
