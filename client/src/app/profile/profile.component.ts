import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
  // encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  @ViewChild('email') email: ElementRef;
  @ViewChild('phone') phone: ElementRef;
  @ViewChild('role') role: ElementRef;
  @ViewChild('department') department: ElementRef;
  @ViewChild('building') building: ElementRef;
  @ViewChild('room') room: ElementRef;
  @ViewChild('first') first: ElementRef;
  @ViewChild('last') last: ElementRef;
  originalEmail: String;
  msgs: Message[] = [];
  
  constructor(private user: UserService, private messageService: MessageService) { }
  getProfile() {
    this.user.getProfile().subscribe((data)=>{
      if (data) {
        this.email.nativeElement.value = data.user.email;
        this.originalEmail = data.user.email;
        this.first.nativeElement.value = data.user.first;
        this.last.nativeElement.value = data.user.last;
        this.phone.nativeElement.value = data.user.phone;
        this.role.nativeElement.value = data.user.role == 1 ? "EHOS" : "Lab Operator";
        this.department.nativeElement.value = data.user.department;
        this.building.nativeElement.value = data.user.building;
        this.room.nativeElement.value = data.user.room;
        
      }
    });
  }
  updateProfile() {
    let userInfo = {
      email: this.email.nativeElement.value,
      first: this.first.nativeElement.value,
      last: this.last.nativeElement.value,
      phone: this.phone.nativeElement.value
    }
    var user = {
      email: this.originalEmail,
      user: userInfo
    }
    this.user.patchProfile(user).subscribe((data) =>{
      console.log(data);
      if (data.success) {
        this.messageService.add({severity: 'success', summary: 'Approved!', detail: 'Your information was updated!'});                    
      }
    }, error =>{
      this.messageService.add({severity: 'error', summary: 'ERROR!', detail: 'Something went wrong. Try again later.'});                    
    });
  }
  ngOnInit() {
    this.getProfile();
  }

}
