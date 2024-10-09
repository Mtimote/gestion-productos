import { Login } from './../../modelos/login.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {

  constructor(private router:Router, private login:LoginService) { }

  ngOnInit(): void {
    this.login.logout();
    //location.reload();
  }

  Login() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    //this.login.currentUserLoginOn.unsubscribe();
    //this.login.logout();
  }
}
