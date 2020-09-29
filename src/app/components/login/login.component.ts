import { UserService } from '@services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  error: "";
  companies: any[];
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  OnSubmit(username, password) {
    this.loading = true;
    this.userService.getCompanies(username, password).subscribe((data) => {
      if (data) {
        this.loading = false;
      }
      this.companies = data.body;
      localStorage.setItem('companies', JSON.stringify(this.companies));
    },
      (error) => {
        this.error = error;
        this.loading = false;
      })
  }


  selectCompany(value, name) {
    localStorage.setItem('selectedCompany', value);
    localStorage.setItem('selectedCompanyName', name);
    this.userService.getToken(value).subscribe((data) => {
      localStorage.setItem('userToken', data.body.token);
      localStorage.setItem('username', data.body.username);
      localStorage.setItem('userid', data.body.id);

      this.router.navigate(['/home']);
    })
  }

}
