import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/AlertService/alert.service';
import { NavbarService } from '../services/NavBarService/navbar.service';
import { LoginServiceService } from '../services/login-service/login.service';
import { NoWhiteSpaceValidator } from '../Validators/no-whitespace';
import {  User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User;
  user1: User;
  myForm:FormGroup;
  inboudClick = false;
  userId:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginServiceService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private navService: NavbarService
  ) {
    this.user = new User();
    this.createForm();
  }

  ngOnInit(): void {

  }
  createForm(){
    this.myForm = this.fb.group({
      input:['', [Validators.required, NoWhiteSpaceValidator.cannotContainSpace]],
      passwordValidator:['',[Validators.required,NoWhiteSpaceValidator.cannotContainSpace ]]
     });
  }



  get f() { return this.myForm.controls; } //used to get form fields

  validatePatientCreds(): void {
    this.inboudClick = true;
     this.alertService.clear();

     if (this.myForm.invalid) {
         return;
     }
   const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.user.email.match(re)) {
      this.loginService
        .validateUserCredsWithEmail(this.user.email, this.user.password)
        .subscribe((res) => {

          this.userId = res.userId;
          console.log(this.userId != null);
          if (this.userId != null) {
            sessionStorage.setItem('user', this.userId);
            sessionStorage.setItem('login_type', "User");
            alert("you are in")
            this.navService.updateNavAfterAuth("User")
            this.router.navigate(['../user-dashboard'], {
              relativeTo: this.route,
            });
          }
        },
          (error) => {
            alert(error.error)
          }
        );
    }
    }
  }

