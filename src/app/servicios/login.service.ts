import { Usuario } from './../modelos/usuario.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../modelos/login.models';
import { Token } from '../modelos/token.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${environment.urlApi}`;
  token: Token;
  user: Usuario;
  //currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getInitialLoginState());
  constructor(private http:HttpClient) { 
    this.loadStorage(); }


    private getInitialLoginState(): boolean {
      return localStorage.getItem('userLoginOn') === 'true';
    }

  login(): Observable<boolean> {
    const user: Login = Object.assign({}, this.formLogin.value);
    console.log("url auth")
    console.log(`${this.url}/auth`);
    return this.http.post(`${this.url}/auth`, user).pipe(
      map((response: any) => {
        const token: Token = {
          token: response.jwt,
        };
        this.saveStorage(token, response.user);
        this.currentUserLoginOn.next(true);
        return true;
      }),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  logout(): void {
    this.token = { token: '' };
    this.user ;
    localStorage.clear();
    this.currentUserLoginOn.next(false);
  }

  isLoginUser(): boolean {
    console.log("rta logueo service");
    console.log(this.token.token.length > 5 ? true : false);
    return this.token.token.length > 5 ? true : false;
  }

  // loadStorag2e(): void {
  //   if (localStorage.getItem('token')) {
  //     this.token = JSON.parse(localStorage.getItem('token'));
  //     this.user = JSON.parse(localStorage.getItem('user'));
  //   } else {
  //     this.token = { access_token: '' };
  //     this.user = null;
  //   }
  // }

  loadStorage(): void {
    try {
        const tokenString = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
        
        if (tokenString && userString) {
            this.token = JSON.parse(tokenString);
            this.user = JSON.parse(userString);
            console.log("this.token -> ")
            console.log(this.token)
        } else {
            this.token = { token: '' };
            this.user;
        }

        // if (userString) {
        //     this.user = JSON.parse(userString);
        // } else {
        //     this.user;
        // }
    } catch (error) {
        console.error('Error loading from localStorage', error);
        this.token = { token: '' };
        this.user;
    }
}

get userLoginOn(): Observable<boolean>{
  return this.currentUserLoginOn.asObservable();
}

  saveStorage(token: Token, user: Usuario): void {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('nombreUsuario', JSON.stringify(user.primerNombre));
    localStorage.setItem('begin', '1');
    localStorage.setItem('userLoginOn', 'true');

    this.token = token;
    this.user = user;
  }

  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
}
