import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isEhos: Boolean = false;
  sidebarDisplay: Boolean = false;
  constructor( private authService: AuthService, private router: Router ) { }
  logout(){
    this.authService.unsetUser();
    this.router.navigate(['/']);
  }
  ngOnInit() {
    if (this.authService.getRole()==1) {
      this.isEhos = true;
    }
  }
}
