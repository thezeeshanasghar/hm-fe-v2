import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  session: any;

  constructor(public router: Router) {
    this.session = localStorage.getItem("Authorized");
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.session != '' && this.session.Authorized) {
      return true
    }
    else {
      this.router.navigate(['/LogIn'], {
        // queryParams: {
        //   return: state.url
        // }
      });

      return false;

    }


  }
}
