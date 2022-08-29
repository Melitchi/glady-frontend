import { LoginComponent } from './login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculatorService } from './services/calculator.service';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HeadersInterceptor } from './headers.interceptor';

describe('HeadersInterceptor', () => {
  
  let httpMock: HttpTestingController;
  let interceptor: HeadersInterceptor;
  let calculatorService:  CalculatorService;
  let mockWindow = { location: { href: '' } };

  const next: any = {
    handle: () => {
      return new Observable(subscriber => {
        subscriber.complete();
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path:"login",component:LoginComponent}]
      )],
      providers: [
        HeadersInterceptor,
        CalculatorService,
        {provide:HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true},
        { provide: 'Window', useValue: mockWindow }
      ],
    })
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(HeadersInterceptor);
    calculatorService = TestBed.inject(CalculatorService);
  });

  afterEach(() =>{
    localStorage.clear();
    httpMock.verify();
  })

  it('should be created', () => {
    const interceptor: HeadersInterceptor = TestBed.inject(HeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });


  it('should add token in headers', () => {
    localStorage.setItem("token","123")
    calculatorService.getGiftCardsValues(20,5).subscribe(res => {})
  
    const req = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${20}`)
    expect(req.request.headers.has('Authorization')).toEqual(true)
    expect(req.request.headers.get('Authorization')).toBe("123")

  });

  it('should send request without adding token if no token on localstorage', () => {
    calculatorService.getGiftCardsValues(20,5).subscribe(res => {})
    const req = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${20}`)
    expect(req.request.headers.has('Authorization')).toEqual(false)

  });

  it('should return 401 error when token is required', () => {
    const returnedError = {status: 401, statusText: "Unauthorized"}

    calculatorService.getGiftCardsValues(20,5).subscribe(
      (next => {}), 
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(401)
      }
      )
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${20}`)
    expect(req.request.headers.has('Authorization')).toEqual(false)
    req.flush(null,returnedError)
  });

});
