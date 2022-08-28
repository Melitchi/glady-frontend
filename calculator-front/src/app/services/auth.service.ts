import { User } from './../models/user';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
     

    login(username:string, password:string ) {
        return this.http.post<User>('http://localhost:3000/login', {username, password}).subscribe
        (res => {
            this.storeToken(res)
        })
        
    } 

    /**
     * Store token data after sign in
     * @param authResponse json with token value
     */
    private storeToken(authResponse:any){
        console.log('dans store token')
        const now = new Date().getTime()
        const expiresAt = (now + 10 * 60000) // Token valable 10min
        localStorage.setItem("token",authResponse.token)
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

    }

    /**
     * Remove token data from local storage
     */
    logout() {
        localStorage.removeItem("id_token");
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
