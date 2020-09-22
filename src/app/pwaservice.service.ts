import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PWAServiceService {

  promptEvent;

  constructor() {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
   }
}
