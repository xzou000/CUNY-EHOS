import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importing this module to be able to use text-mask library
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Our Dialog upon submission
  display: boolean = false;
  dialogTitle: String;
  dialogBody: String;
  isEmailTaken: boolean = false;
  // Declare a registerForm with datatype of FormGroup
  registerForm: FormGroup;
  // Using TextMask Module to format the phone number field
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // Inside constructor, instantiate FormBuilder class
  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  // Have method that will create the register form entities
  // Inside the formBuilder class, we have a method group, which will attach our form validation requirements
  createForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
        this.isValidEmail
      ])],
      department: ['', Validators.required],
      building: ['', Validators.required],
      room: ['', Validators.required],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        this.isValidPhoneNumber
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        this.isValidPassword
      ])],
      confirmPassword: ['', Validators.required]
    }, {
      validator:this.isMatchingPasswords('password','confirmPassword')
    }
    );
  }
  onRegisterFormSubmit(){
    // Let's create a user object to send
    const user = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value.toLowerCase(),
      role: this.registerForm.get('jobTitle').value,
      department: this.registerForm.get('department').value,
      building: this.registerForm.get('building').value,
      room: this.registerForm.get('room').value,
      phoneNumber: this.registerForm.get('phoneNumber').value,
      password: this.registerForm.get('password').value,
      needsApproval: true
    }
    // Let's call authService.registerUser method we created to send the obj to the backend
    // We will handle this request as a promise the rxjs repo has a way to convert an Observable to a Promise via toPromise...
    // A promise is a js object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
    this.authService.registerUser(user).toPromise().then(response => {
      // Response should already be in JSON format
      console.log(response);
      if (!response.success) {
          
          this.dialogTitle = "Failed!";
          this.dialogBody = response.message;
      }
      else{
        console.log(response.message);
        this.dialogTitle = "Success!";
        this.dialogBody = "You have registered! A confirmation email will be sent to you by someone at the EHOS department.";
      }
      this.display = true;
    });

  }
  isEmailAvailable () {
    if (this.registerForm.get('email').value.length < 1) {
      this.isEmailTaken = false;
    }
    this.authService.checkEmail(this.registerForm.get('email').value.toLowerCase()).subscribe(
      response => {
        if (!response.success){
          this.isEmailTaken = true;
        }
        else {
          this.isEmailTaken = false;
        }
      }
      ,
      error => {
        this.isEmailTaken = true;        
      }
    );
  }
  // A validator function that uses a regular expression to see if the email entered is a valid format
  isValidEmail(formControl) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(formControl.value)) {
        return null; // Valid email format!
    }
    else {
      return { invalidEmail: true }
    }
  }
  // A validator function that uses a regular expression to check for valid password
  isValidPassword(formControl) {
    // Needs at least a lowercase, uppercase, and a number, and between 8 and 40 chars
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).{8,40}$/);
    if (regExp.test(formControl.value)) {
        return null;
    }
    else{
      return { invalidPassword: true }
    }
  }
  isValidPhoneNumber(formControl) {
    // Needs to be a phone number, mask will help with part of the format but we still must check
    /*
    All digits as 0 is not allowed.
    The area code cannot be the same digit,
    The 1st and 4th digit cannot be 0 or 1.
    */
    const regExp = new RegExp(/(?:^|\D)\(([2-9])(?:\d(?!\1)\d|(?!\1)\d\d)\)\s*[2-9]\d{2}-\d{4}/);
    if (regExp.test(formControl.value)) {
        return null;
    }
    else{
      return { invalidPhoneNumber: true }
    }
  }
  isMatchingPasswords(password,confirmPassword){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirmPassword].value) {
          return null;
      }
      else{
        return { passwordsNoMatch: true }
      }
    }
  }
  showDialog() {
    this.display = true;
  }
  closeDialog() {
    this.display = false;
    if (this.dialogTitle === "Success!") {
      this.registerForm.reset();
    }

  }
  ngOnInit(

  ) {
  }

}
