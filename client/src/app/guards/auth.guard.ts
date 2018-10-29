import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AnyAuthGuard implements CanActivate {
    constructor(private user: AuthService, private router: Router ){}

    canActivate() {
      console.log(this.router.url);
      
      if (!this.user.tokenExpired()) { // Already signed in
        if (this.user.getRole() == 1) {
          this.router.navigate(['/ehos']);
          return true;
        }
        else if (this.user.getRole() == 2){
          this.router.navigate(['/lab']);
          return true;
        }
      }
      return true;
    }
  }

@Injectable()
export class EhosAuthGuard implements CanActivate {
    constructor(private user: AuthService, private router: Router){}

    canActivate() {
      if (!this.user.tokenExpired()) {
        if (this.user.getRole() == 1) {
          return true;
        }
        else if (this.user.getRole() == 2){
          this.router.navigate(['/lab']);  // Redirect to a forbidden page instead
          return false;
        }
      }
      this.router.navigate(['/']);
      return false;
    }
  }
  @Injectable()
  export class LabAuthGuard implements CanActivate {
      constructor(private user: AuthService, private router: Router){}
  
      canActivate() {
        if (!this.user.tokenExpired()) {
          if (this.user.getRole()==2) {
            return true
          }
          else if (this.user.getRole() == 1){
            this.router.navigate(['/ehos']);  // Redirect to a forbidden page instead
            return false;
          }
        }
        this.router.navigate(['/']);
        return false;
      }
    } 
    @Injectable()
    export class ProfileGuard implements CanActivate {
        constructor(private user: AuthService, private router: Router){}
    
        canActivate() {
          if (!this.user.tokenExpired()) {
            return true;   
          }
          return false;
        }
      } 