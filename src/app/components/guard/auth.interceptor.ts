import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept2(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.spinner.show();

    const tokenA = localStorage.getItem('token');
    if (tokenA) {
      let token = JSON.parse(tokenA);
      const cloneRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.access_token}`)
      });

      return next.handle(cloneRequest)
        .pipe(
          tap(
            success => { },
            error => {
              if (error.status == 401) {
                localStorage.removeItem('token');
                this.router.navigate(['/producto']);
              } else if (error.status == 403) {
                this.router.navigate(['/forbidden']);
              }
            },
          ),
        //   finalize(() => {
        //     this.spinner.hide();
        //   })
        );

    } else {
      return next.handle(req.clone())
        .pipe(
          tap(
            success => { },
            error => {
              if (error.status == 401) {
                this.router.navigate(['/login']);
              }
            },
          ),
        //   finalize(() => {
        //     this.spinner.hide();
        //   })
        );
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.spinner.show();

    const tokenA = localStorage.getItem('token');
    let cloneRequest = req;

    if (tokenA) {
      const token = JSON.parse(tokenA);
      cloneRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.token}`)
      });
    }

    return next.handle(cloneRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/producto']);
        } else if (error.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        return throwError(() => new Error(error));
      }),
    //   finalize(() => {
    //     this.spinner.hide();
    //   })
    );
  }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const tokenA = localStorage.getItem('token');
//     let cloneRequest = req;
  
//     if (tokenA) {
//       const token = JSON.parse(tokenA);
//       cloneRequest = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token.token}`)
//       });
//     }
  
//     return next.handle(cloneRequest).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           // Lógica para refrescar el token
//           return this.authService.refreshToken().pipe(
//             switchMap((newToken: any) => {
//               localStorage.setItem('token', JSON.stringify(newToken));
//               cloneRequest = req.clone({
//                 headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
//               });
//               return next.handle(cloneRequest);
//             }),
//             catchError(err => {
//               localStorage.removeItem('token');
//               this.router.navigate(['/producto']);
//               return throwError(() => new Error(err));
//             })
//           );
//         } else if (error.status === 403) {
//           this.router.navigate(['/forbidden']);
//         }
//         return throwError(() => new Error(error));
//       })
//     );
//   }

}
