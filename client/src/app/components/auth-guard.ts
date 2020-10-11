import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.auth.user.pipe(map(user => {
      // return !!user;
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        return this.router.createUrlTree(["/login"]);
      }
    }));

  }
}
//,tap(isAuth=>{
//   if(!isAuth){
//      this.router.navigate(['/login']);
//   }
// })
