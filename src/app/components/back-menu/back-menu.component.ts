import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-back-menu',
  templateUrl: './back-menu.component.html',
  styleUrls: ['./back-menu.component.scss']
})
export class BackMenuComponent implements OnInit {

  @Input() isAddMode;
  @Input() classApplied;
  @Output() showImgForm = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  showForm(event: Event) {
    this.showImgForm.emit(event);
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

}
