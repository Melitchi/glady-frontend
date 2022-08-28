import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError} from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

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
        console.log("error",error)
          return throwError(() => error)
      })
    )
  }else{
    return next.handle(request).pipe(
      catchError((error : any) => {
        console.log("error",error)
        if(error.status  === 401){
          window.location.href = "/login";  
          return throwError(() => error)
        }else{
          return throwError(() => error)
        }
      })
    );
  }
  }
}
