import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
  // encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users = [];
  display: Boolean = false;
  displayDelete: Boolean = false;
  displayLab: Boolean = false;
  loading: Boolean = false;
  isEmailTaken: boolean = false;
  user: Number;
  msgs: Message[] = [];
  userForm: FormGroup;
  approved = new FormControl();
  name: String = '';
  originalEmail: String = '';
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];  
  
  constructor( private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService, private messageService: MessageService) {
    this.createForm();
   }
  // Helper functions
  isEmailAvailable () {
    if (this.userForm.get('email').value.length < 1) {
      this.isEmailTaken = false;
    }
    if (this.users[Number(this.user)].email != this.userForm.get('email').value) {
      this.authService.checkEmail(this.userForm.get('email').value).subscribe(
        response => {
          if (!response.success){
            this.isEmailTaken = true;
          }
          else {
            this.isEmailTaken = false;
          }
        }
      );
    }
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
  //
  createForm() {
    this.userForm = this.formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
        this.isValidEmail
      ])],
      department: ['', Validators.required],
      building: ['', Validators.required],
      room: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        this.isValidPhoneNumber
      ])]
    });
  }
  getUsers() {
    this.userService.getUsers().then( response => {
      if (response.success) {
        const usersArr = response.users; // [{user 1 info},{ user 2 info}]
        for (let index in usersArr) {
          var temp = {};
          for (let key in usersArr[index]) {
            temp[key] = usersArr[index][key];
          }
          this.users.push(temp); // [...,{temp is pushed}]
        }
      }
      else {
        // No users
      }
    }).catch( reason => {
      if (reason.status === 403) {
        // redirect to login page
        console.log("Your session has timed out, returning to login screen");
      }
    });
  }
  deleteUser(user) {
    this.name = '';
    this.loading = true;
    this.userService.deleteUser(this.users[Number(this.user)].email).then(response => {
      this.users.splice(Number(this.user),1); // Reindex the array
      this.messageService.add({severity: 'success', summary: 'Approved!', detail: 'User was deleted!'});                    
      this.loading = false;
    }).catch( reason =>{
      this.messageService.add({severity: 'success', summary: 'ERROR!', detail: 'There was some error trying to delete. Try again.'});                    
      this.loading = false;
    });
    this.displayDelete = false;
    this.display = false;    
    this.closeDialog();
  }
  openDialog(i) {
    this.approved.reset();
    this.userForm.reset();
    this.user = Number(i); // Save the current user that was selected      
    this.name = this.users[i].first + " " + this.users[i].last;
    this.originalEmail = this.users[i].email;
    Object.keys(this.users[i]).forEach( (val,index) => {
      if (val != "_id") {
        this.userForm.patchValue({[val]: this.users[i][val]});  
      }
    });
    this.approved.setValue(this.users[i].approved);
    if (this.approved.value) {
      this.approved.disable();
    }
    else {
      this.approved.enable();
    }
    this.display = true;
  }
  openDeleteDialog() {
    this.displayDelete = true;
  }
  closeDialog() {
    this.approved.reset();
    this.userForm.reset();
    this.originalEmail = '';
  }
  onUserFormSubmit() {
    let userInfo = {
      approved: this.approved.value,
      first: this.userForm.get('first').value,
      last: this.userForm.get('last').value,
      email: this.userForm.get('email').value,
      department: this.userForm.get('department').value,
      building: this.userForm.get('building').value,
      room: this.userForm.get('room').value,
      phoneNumber: this.userForm.get('phone').value,
    }
    var user = {
      email: this.originalEmail,
      user: userInfo
    }
    this.userService.patchProfile(user).subscribe((data) =>{
      this.display = false;
      if (data.success) {
        this.messageService.add({severity: 'success', summary: 'Approved!', detail: 'User was edited!'});              
      }
      else {
        this.messageService.add({severity: 'success', summary: 'ERROR!', detail: 'There was some error trying to update. Try again.'});              
      }
      this.approved.reset();
    });
  }
  approveLabAccounts() {
    this.displayLab = false;
    this.loading = true;
    this.userService.approveLabAccounts().then(val =>{
      this.messageService.add({severity: 'success', summary: 'Approved!', detail: 'All lab users were approved!'});    
      this.loading = false;          
    }).catch(reason =>{
      this.messageService.add({severity: 'success', summary: 'ERROR!', detail: 'Something went wrong. Try again later.'});                    
      this.loading = false;
    });
  }
  ngOnInit() {
    this.display = false;
    this.getUsers();

  }
}
