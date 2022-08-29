import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logout()
  }
}
