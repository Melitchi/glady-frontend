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
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'tokenTest123'
    request =request.clone({
      setHeaders : {
        'Authorization': token
      }
    })
    return next.handle(request);
  }
}
