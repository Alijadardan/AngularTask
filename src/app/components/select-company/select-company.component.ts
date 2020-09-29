import { UserService } from '@services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {

  companies;
  selectedCompany;

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.selectedCompany = localStorage.getItem('selectedCompanyName');

    this.companies = JSON.parse(localStorage.getItem("companies"));
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

}
