import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log("Called");
    if (this.authService.isLoggedIn()) {
      console.log("True");
      return true;
    } else {
      console.log("False");
      this.router.navigate(['/login']);
      return false;
    }
  }
}