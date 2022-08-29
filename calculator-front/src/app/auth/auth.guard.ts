import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url :string = state.url
      return this.checkLogin(url);
  }
  
  /**
   * Verify if user is logged in, redirect to login page if not
   * @param url 
   * @returns 
   */
  checkLogin(url : string):true|UrlTree{
    if(this.authservice.isLoggedIn()){
      return true
    }
    this.authservice.redirectUrl = url // redirect user on the required page after login 
    return this.router.parseUrl('login')
  }

}
