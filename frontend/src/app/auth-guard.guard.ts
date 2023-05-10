import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor (private authservice: AuthService, private router: Router) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authservice.isLoggedIn()) {
      return true
    }
    this.router.navigate(['/login']);
    return false
  }

}
