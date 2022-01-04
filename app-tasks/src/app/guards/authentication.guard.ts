import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/login/account.service';
import { LoginService } from '../services/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(!this.accountService.isLoggedIn()) {
         this.loginService.removeToken();
         this.router.navigateByUrl("/");
         return false;
       }
    return true;
  }

}
