import { PWAServiceService } from './../../pwaservice.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title, public Pwa: PWAServiceService) {}

  ngOnInit(): void {
    this.title.setTitle("Angular Home");
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }
}
