import { Login } from './../../modelos/login.models';
import { LoginService } from 'src/app/servicios/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(private login:LoginService) { }
  userLoginOn:boolean=false;
  private loginSubscription: Subscription;
  
  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userLoginOn = this.login.currentUserLoginOn.value;
    this.loginSubscription = this.login.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

}
