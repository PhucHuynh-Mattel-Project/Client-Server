import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { NavbarService } from './services/NavBarService/navbar.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Vaxify2';

  links: Array<{ text: string, path: string }>;
  login_type: string;
  isLoggedIn=false;

  constructor(private router: Router, private navbarService: NavbarService) {
    this.router.config.unshift(
      { path: '/loginPatient', component: LoginComponent }

    );
  }

  ngOnInit() {
    this.login_type=sessionStorage.getItem('login_status');
    this.links = this.navbarService.getLinks();

    if (this.login_type){
      this.isLoggedIn=true;
    }

  }

}










