import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) { }
  
  canActivate(): Promise<boolean> | boolean {
    if (this.loginService.isLoginUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}