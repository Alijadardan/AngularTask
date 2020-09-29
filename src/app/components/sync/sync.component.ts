import { fadeinAnimation } from './../../animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss'],
  animations: [fadeinAnimation]
})
export class SyncComponent implements OnInit {

  @Input() isLoading:boolean;
  @Input() lastSync;

  constructor() { }

  ngOnInit(): void {
  }

}
