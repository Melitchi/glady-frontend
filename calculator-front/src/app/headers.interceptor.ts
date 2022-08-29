import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError} from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  /**
   *  Intercept all requests to add headers
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token")
    if(token){
    const clone = request.clone({
      setHeaders : {
        'Authorization': token
      }
    })
    return next.handle(clone).pipe(
      catchError((error : any) => {
          return throwError(() => error)
      })
    )
  }else{
    return next.handle(request).pipe(
      catchError((error : any) => {
        if(error.status  === 401){
          this.router.navigateByUrl('login');

          return throwError(() => error)
        }else{
          return throwError(() => error)
        }
      })
    );
  }
  }
}
