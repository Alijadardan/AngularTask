import { TutorialService } from './../services/tutorial.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  info: string;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.tutorialService.getInfo().subscribe((data)=>{
      console.log(data + "data");
      this.info = data
    });

  }

}
