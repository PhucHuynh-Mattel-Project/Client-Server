import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  ssn:string;
  login_type:string;
  constructor() { }

  ngOnInit(): void {
    this.ssn=sessionStorage.getItem('patient');
    this.login_type=sessionStorage.getItem('login_type');


  }

}
