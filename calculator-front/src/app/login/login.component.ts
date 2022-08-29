import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup

  constructor(private formbuilder:FormBuilder,
    private authService:AuthService,
    private router: Router) {
      this.loginForm = this.formbuilder.group({
        username:['',Validators.required],
        password:['',Validators.required]
      })
    }
 
    login(){
      const val = this.loginForm.value
      if(val.username && val.password){
        this.authService.login(val.username,val.password)
      }
    }

}
