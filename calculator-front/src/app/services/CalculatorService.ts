import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { CalculatorServerResponse } from '../models/CalculatorServerRespponse';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CalculatorService {

    constructor(private http: HttpClient) {}

    getGiftCardsValues(wantedAmount : number, shopId : number):Observable<CalculatorServerResponse> {
        return this.http.get<CalculatorServerResponse>(`http://localhost:3000/shop/${shopId}/search-combination?amount=${wantedAmount}`)
    }
}