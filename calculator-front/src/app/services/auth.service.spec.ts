import { LoginComponent } from './../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed} from '@angular/core/testing';
import { AuthService } from "./auth.service";
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('Service: Auth', () =>{
    let httpMock: HttpTestingController;
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule, RouterTestingModule.withRoutes(
                [{path:"login",component:LoginComponent}]
            )],
            providers:[AuthService],
            
          })
          httpMock = TestBed.inject(HttpTestingController);
          service = TestBed.inject(AuthService);
    });
    
    afterEach(() => { 
    localStorage.clear();
    httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
       });

    it('should return true from isAuthenticated until token did not expires', () => {
        const now = new Date().getTime() + 5 * 60000
        localStorage.setItem('token', '1234');
        localStorage.setItem('expires_at', JSON.stringify(now.valueOf()));
        expect(service.isLoggedIn()).toBeTruthy();
    });

    it('should return false from isAuthenticated when token has expired', () => {
        const now = new Date().getTime() - 5 * 60000
        localStorage.setItem('token', '1234');
        localStorage.setItem('expires_at', JSON.stringify(now.valueOf()));
        expect(service.isLoggedIn()).toBeFalsy();
    });
      
    it('should return expiration date of the token', () => {
        const now = new Date().getTime() + 5 * 60000
        localStorage.setItem('token', '1234');
        localStorage.setItem('expires_at', JSON.stringify(now.valueOf()));
        expect(service.getExpiration()).toEqual(new Date(now));
    });

    it('should store token value on localStorage', () => {
        const jsonToken = {"token":"123"};
        service.login("toto","tutu")
        const req  = httpMock.expectOne("http://localhost:3000/login")  
        expect(req.request.method).toBe("POST")    
        req.flush(jsonToken)  
        expect(localStorage.getItem('token')).toEqual("123")
    });

    it('should clear local storage',() => {
        const now = new Date().getTime() + 5 * 60000
        localStorage.setItem('token', '1234');
        localStorage.setItem('expires_at', JSON.stringify(now.valueOf()));
        service.logout()
        expect(localStorage.length).toEqual(0)
    })
})