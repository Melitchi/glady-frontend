import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const token = localStorage.getItem("id_token")
    if(token){
    const clone = request.clone({
      setHeaders : {
        'Authorization': token
      }
    })
    return next.handle(clone);
  }else{
    return next.handle(request);
  }
  }
}
