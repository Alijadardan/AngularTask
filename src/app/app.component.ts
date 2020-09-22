import { slideInAnimation } from './animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PWAServiceService } from './pwaservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'Agenda-Angular';

  constructor(public Pwa: PWAServiceService) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }
}
