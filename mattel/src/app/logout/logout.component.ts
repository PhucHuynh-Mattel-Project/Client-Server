import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/NavBarService/navbar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private navService: NavbarService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.navService.updateLoginStatus(false);
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
