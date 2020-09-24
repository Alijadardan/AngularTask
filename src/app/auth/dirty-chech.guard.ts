import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DirtyComponent } from '../models/dirty-component';


@Injectable({
  providedIn: 'root'
})
export class DirtyCheckGuard implements CanDeactivate<DirtyComponent> {

  canDeactivate(
    component: DirtyComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.canDeactivate()) {
      return Swal.fire({
        title: 'There are changes you have made to the page. If you quit, you will lose your changes.',
        showCancelButton: true,
        confirmButtonText: `Stay`,
        cancelButtonText: `Leave`,
        icon: 'warning'
      }).then((result) => {
        if(result.isConfirmed){
          return false;
        }else{
          return true;
        }
      })
    } else {
      return true;
    }
  }

}
