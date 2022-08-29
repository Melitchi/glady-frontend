import { CalculatorService } from './../services/calculator.service';
import { HeaderComponent } from './../header/header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let httpMock: HttpTestingController;
  let calculatorService: CalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, HeaderComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule],
      providers:[CalculatorService],
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    calculatorService = TestBed.inject(CalculatorService);
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable buttons minus and plus',() => {
    const workingRequest = { "equal": { "value": 20, "cards": [ 20 ] }, "floor": { "value": 20, "cards": [ 20 ] }, "ceil": { "value": 20, "cards": [ 20 ] } }
    component.giftForm.patchValue({wantedAmount: 20});
    component.onSubmitForm();
    
    calculatorService.getGiftCardsValues(2,5).subscribe(result =>{})
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${2}`)  
    expect(req.request.method).toBe("GET")    
    req.flush(workingRequest)

    expect(component.isValidValue).toEqual(true)
  });
  
  it('should enable buttons minus and plus',() => {
    const betweenRequest = { "floor": { "value":20, "cards": [ 21 ] }, "ceil": { "value": 22, "cards": [ 22] } }

    component.giftForm.patchValue({wantedAmount: 21});
    component.onSubmitForm();

    calculatorService.getGiftCardsValues(2,5).subscribe(result =>{})
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${21}`)  
    expect(req.request.method).toBe("GET")    
    req.flush(betweenRequest)

    expect(component.isValidValue).toEqual(false)
  });

  it('should enable only button plus',() => {
    const betweenRequest = {"ceil": { "value": 20, "cards": [ 20] } }

    component.giftForm.patchValue({wantedAmount: 5});
    component.onSubmitForm();

    calculatorService.getGiftCardsValues(2,5).subscribe(result =>{})
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${5}`)  
    expect(req.request.method).toBe("GET")    
    req.flush(betweenRequest)

    expect(component.isValidValue).toEqual(false)
    expect(betweenRequest.ceil).toBeDefined

  });

  it('should enable only button minus',() => {
    const tooHighRequest = {"floor": { "value": 70, "cards": [ 35 , 35] } }

    component.giftForm.patchValue({wantedAmount: 78});
    component.onSubmitForm();

    calculatorService.getGiftCardsValues(2,5).subscribe(result =>{})
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${78}`)  
    expect(req.request.method).toBe("GET")    
    req.flush(tooHighRequest)

    expect(component.isValidValue).toEqual(false)
    expect(tooHighRequest.floor).toBeDefined

  });

  it('should display bad shop error message',() => {
    const returnedError = {status: 400, statusText: "Shop not found!"}
    component.giftForm.patchValue({wantedAmount: 20});
    component.giftForm.patchValue({shopId: 2});
    component.onSubmitForm();
    
    calculatorService.getGiftCardsValues(2,2).subscribe({})
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${2}/search-combination?amount=${20}`)
    expect(req.request.method).toBe("GET")
    req.flush(null, returnedError)
    expect(component.errorMessage).toEqual("Erreur, le service n'est actuellement disponible que pour le vendeur Amazon.")
  });

  it('should display error message',() => {
    const returnedError = {status: 500, statusText: "Internal Server Error"}
    component.giftForm.patchValue({wantedAmount: 20});
    component.giftForm.patchValue({shopId: 5});
    component.onSubmitForm();
    
    calculatorService.getGiftCardsValues(2,2).subscribe({})
    const req  = httpMock.expectOne(`http://localhost:3000/shop/${5}/search-combination?amount=${20}`)
    expect(req.request.method).toBe("GET")
    req.flush(null, returnedError)
    expect(component.errorMessage).toEqual("Une erreur s'est produite, veuillez réessayer plus tard.")
  });
});
