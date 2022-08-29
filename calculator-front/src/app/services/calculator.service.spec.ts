import { CalculatorService } from './calculator.service';
import { TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('Calculator service', () =>{
    let httpMock: HttpTestingController;
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[CalculatorService],
          })
          httpMock = TestBed.inject(HttpTestingController)
          service = TestBed.inject(CalculatorService)
    });
    
    afterEach(() => { 
    localStorage.clear();
    httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get working values',() =>{
        const workingRequest = { "equal": { "value": 20, "cards": [ 20 ] }, "floor": { "value": 20, "cards": [ 20 ] }, "ceil": { "value": 20, "cards": [ 20 ] } }
        service.getGiftCardsValues(20,5).subscribe(result =>{
            expect(result).toEqual(workingRequest)
        })
        const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${20}`)  
        expect(req.request.method).toBe("GET")    
        req.flush(workingRequest)
      })

      it('should purpose only higher value',() =>{
        const  tooLowRequest = { "ceil": { "value": 5, "cards": [ 5 ] } }
        service.getGiftCardsValues(2,5).subscribe(result =>{
            expect(result).toEqual(tooLowRequest)
        })
        const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${2}`)  
        expect(req.request.method).toBe("GET")    
        req.flush(tooLowRequest)
      })

      it('should purpose floor and ceil values',() =>{
        const betweenRequest = { "floor": { "value":20, "cards": [ 21 ] }, "ceil": { "value": 22, "cards": [ 22] } }
        service.getGiftCardsValues(21,5).subscribe(result =>{
            expect(result).toEqual(betweenRequest)
        })
        const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${21}`)  
        expect(req.request.method).toBe("GET")    
        req.flush(betweenRequest)
      })

      it('should purpose only lower value',() =>{
        const  tooHighRequest = { "floor": { "value": 70, "cards": [ 35, 35 ] } }
        service.getGiftCardsValues(78,5).subscribe(result =>{
            expect(result).toEqual(tooHighRequest)
        })
        const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${78}`)  
        expect(req.request.method).toBe("GET")    
        req.flush(tooHighRequest)
      })
})