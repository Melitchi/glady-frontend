import { Router } from '@angular/router';
import { User } from './../models/user';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    redirectUrl: string =''

    constructor(private http: HttpClient, private router: Router) {
    }
     

    /**
     * Authenticate user and get token from server
     * @param username 
     * @param password 
     * @returns json
     */
    login(username:string, password:string ) {
        return this.http.post<User>('http://localhost:3000/login', {username, password}).subscribe
        (res => {
            this.storeToken(res)
            this.router.navigate([this.redirectUrl]);
        }) 
    } 

    /**
     * Store token data after sign in
     * @param authResponse json with token value
     */
    private storeToken(authResponse:any){
        const now = new Date().getTime()
        const expiresAt = (now + 10 * 60000) // Token valable 10min
        localStorage.setItem("token",authResponse.token)
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    /**
     * Remove token data from local storage
     */
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
    }

    /**
     * Get token expiration
     * @returns Date
     */
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration !=  null){
            const expiresAt = JSON.parse(expiration);
            return new Date(expiresAt);

        }else{
            return new Date().getTime() - 10000
        }
    }    

    /**
     * Check if token is not expired
     * @returns boolean
     */
    public isLoggedIn() {
        const now = new Date().getTime()
        return now < this.getExpiration();
    }

    
    isLoggedOut() {
        return !this.isLoggedIn();
    }
}
