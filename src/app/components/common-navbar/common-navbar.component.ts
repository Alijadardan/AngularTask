import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss']
})
export class CommonNavbarComponent implements OnInit {
  user: any;
  companies: any[];
  selectedCompany;


  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("username");
    this.companies = JSON.parse(localStorage.getItem("companies"));
    this.selectedCompany = localStorage.getItem('selectedCompanyName');
  }

  changeCompany(id, name) {
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
