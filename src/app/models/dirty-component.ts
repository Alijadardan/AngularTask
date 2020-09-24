import { HostListener } from '@angular/core';
import {Observable} from 'rxjs';

export declare interface DirtyComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}
