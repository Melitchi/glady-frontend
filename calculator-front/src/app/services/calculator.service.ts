import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { CalculatorServerResponse } from '../models/calculatorServerResponse';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CalculatorService {

    constructor(private http: HttpClient) {}

    /**
     * Call calculator-server to get cards combinations according to user's choice
     * @param wantedAmount amount requested by user
     * @param shopId selected shop id 
     * @returns 
     */
    getGiftCardsValues(wantedAmount : number, shopId : number):Observable<CalculatorServerResponse> {
        return this.http.get<CalculatorServerResponse>(`http://localhost:3000/shop/${shopId}/search-combination?amount=${wantedAmount}`)
    }
}