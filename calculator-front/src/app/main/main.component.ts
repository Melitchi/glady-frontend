import { CalculatorServerResponse } from './../models/calculatorServerResponse';
import { CalculatorComponentValue } from './../models/calculatorComponentValue'
import { CalculatorService } from '../services/calculator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  giftForm!: FormGroup
  amountRegexp! : RegExp
  serverResponse! :CalculatorServerResponse;
  isValidValue : boolean = true
  calculatorComponentValue!: CalculatorComponentValue
  cardsCounts : { [key: string]: number } = {}
  constructor(private formBuilder: FormBuilder, private calculatorService:CalculatorService) { }

  ngOnInit(): void {
    this.amountRegexp = /^[1-9]+[0-9]*$/;
    this.giftForm = this.formBuilder.group({
      wantedAmount:[null, [Validators.required, Validators.pattern(this.amountRegexp)]]
    })
  }

  /**
   * send value to server when form is submited
   */
  onSubmitForm(){
    this.calculatorService.getGiftCardsValues(this.giftForm.value["wantedAmount"],5).subscribe((response:CalculatorServerResponse) => {
      this.serverResponse = {...  response}
      this.processResult();
    })
  }

  /**
   * Manage server's response
   */
  processResult(){
    this.cardsCounts = {} // reset 
    if(this.serverResponse.equal!=undefined){ 
      this.isValidValue = true
      this.calculatorComponentValue =  {...this.serverResponse.equal} 

      // Counts number of occurencies in cards[]
      for (const num of this.calculatorComponentValue.cards) {
        this.cardsCounts[num] = this.cardsCounts[num] ? this.cardsCounts[num] + 1 : 1;
      }
    }
    else{
      this.isValidValue = false;
    }
  }

  /**
   * Update wanted amount to possible higher value
   */
  onHigherValue(){
      if(this.serverResponse.ceil!=undefined){
      this.giftForm.patchValue({
        wantedAmount: this.serverResponse.ceil.value 
      })
      this.onSubmitForm();
    }
  }

  /**
   * Update wanted amount to possible lower value
   */
   onLowerValue(){
    if(this.serverResponse.floor!=undefined){
      this.giftForm.patchValue({
        wantedAmount: this.serverResponse.floor.value 
      })
      this.onSubmitForm();
    }
  }

}
