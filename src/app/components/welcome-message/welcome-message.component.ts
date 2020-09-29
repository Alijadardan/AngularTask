import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss']
})
export class WelcomeMessageComponent implements OnInit {

  user: any;

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem("username");
  }

}
