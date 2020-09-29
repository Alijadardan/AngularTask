import { TutorialService } from '@services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  info: string;

  constructor(private tutorialService: TutorialService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Angular Tutorial");
    this.tutorialService.getInfo().subscribe((data) => {
      console.log(data);
      this.info = data
    });

  }

}
