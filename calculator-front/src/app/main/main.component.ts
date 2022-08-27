import { CalculatorServerResponse } from './../models/CalculatorServerRespponse';
import { CalculatorService } from './../services/CalculatorService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  giftForm!: FormGroup
  amountRegexp! : RegExp
  serverResponse!:CalculatorServerResponse;

  constructor(private formBuilder: FormBuilder, private calculatorService:CalculatorService) { }

  ngOnInit(): void {
    this.amountRegexp = /^[1-9]+[0-9]*$/;
    this.giftForm = this.formBuilder.group({
      wantedAmount:[null, [Validators.required, Validators.pattern(this.amountRegexp)]]
    })
  }

  onSubmitForm(){
    console.log(this.giftForm.value["wantedAmount"])
    this.calculatorService.getGiftCardsValues(this.giftForm.value["wantedAmount"],5).subscribe((response:CalculatorServerResponse) => {
      this.serverResponse = {...  response}
    })
    console.log(this.serverResponse)

  }

}
