import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  incorrectCredentials: Boolean = false;
  message: String;
  // Declare a registerForm with datatype of FormGroup
  loginForm: FormGroup;
  // Inside constructor, instantiate FormBuilder class
  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router ) {
    this.createForm(); // create the form upon initialization
  }
  // Have method that will create the register form entities
  createForm(){
    // group method will declare our form controls and also we can apply built in validators
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // Have a method handler for form submission
  onLoginSubmit(){
    this.authService.loginUser({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value})
    .subscribe( data => {
      // Response should already be in JSON format
      console.log(data);
      if (!data.success) {
        console.log("OPEN DIALOG");
        
        this.message = data.message;
        this.incorrectCredentials = true;
      }
      else {
        this.authService.setUser(data.token,data.privilege,data.expires); // Store the web token and the role on the browser
        if (data.privilege == 1) {
          this.router.navigate(['/ehos']);
        }
        else if (data.privilege == 2){
          this.router.navigate(['/lab']);
        }

      }
    },
      err =>{
        this.message = err.error.message;
        this.incorrectCredentials = true;
      }
    );
  }


  ngOnInit() {
  }

}
