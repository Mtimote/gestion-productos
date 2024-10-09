import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    let token = this.loginService.token;
    let payload = JSON.parse(atob(token.token.split('.')[1]));
    let expired = this.expired(payload.exp);
    if (expired) {
      this.loginService.logout();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  expired(date: number) {
    let now = new Date().getTime() / 1000;
    return date < now ? true : false;
  }
}
