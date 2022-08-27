import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  giftForm!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.giftForm = this.formBuilder.group({
      wantedAmount:[0]
    })
  }

  onSubmitForm(){
    console.log(this.giftForm.value)
  }

}
