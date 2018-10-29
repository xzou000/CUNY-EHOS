import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { AccordionModule } from 'primeng/accordion'; 
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from "../services/user.service";
import { SelectItem } from 'primeng/api';
import { WasteManagementService } from '../services/waste-management.service';
// import { log } from 'fullcalendar/src/util';
import { and } from '@angular/router/src/utils/collection';
import { LabInspectionService } from '../services/lab-inspection.service';
@Component({
  selector: 'app-lab-inspections',
  templateUrl: './lab-inspections.component.html',
  styleUrls: ['./lab-inspections.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LabInspectionsComponent implements OnInit {
    inspectors: any[];
    //inspection: any;
    history: any[];
    date: Date;
    inspector: any;
    Location: any[];
    User: Number;
    msgs: Message[] = [];
    
    constructor(private messageService: MessageService, private user: UserService, private waste: WasteManagementService, private insp: LabInspectionService) { 

    }
    
    scheduleInspection() {
      let inspection = {
        inspector: this.inspector._id,
        lab: this.inspector.department + ", " + this.inspector.building + " Room " + this.inspector.room,
        requested: moment().format(),
        requestId: '', 
        start: moment(this.date).format(), 
        end: '', 
        eventType: 2,
        serviced: false
      }
      this.insp.createRequest(inspection).then(ins=>{
        this.messageService.add({severity: 'success', summary: 'Done!', detail: 'Inspection was created!'});                
      }).catch(rejected=>{
        this.messageService.add({severity: 'error', summary: 'ERROR!', detail: 'An error occurred.'});                
        if (rejected.code == 403) {
          console.log("redirect");
          
        }
      });
      console.log(inspection);
      
    }
    getData() {
      this.insp.getRequests().then(response =>{
        this.history = response.inspections;
        this.history.forEach((element) => {
          element.requested = moment(element.requested).format('MMMM Do YYYY');
          });
      }).catch(reason=>{});
   }
  ngOnInit() {
      this.user.getUsers().then(response => {// get EHOS members
        this.inspectors = response.users;
        this.inspectors.forEach((element, index)=>{
          if(element.privilege === 1 && element.approved === true){
            this.inspectors[this.inspectors.indexOf(element)]["name"] = element.first + ' ' + element.last;
          };            
        });
        for(var i = 0; i<this.inspectors.length;i++){
          if(this.inspectors[i].privilege === 2 || this.inspectors[i].approved === false){
            this.inspectors.splice(i, 1);
            i--;
          }
        };
      }).catch(reason => {
        console.log(reason);
      });
      this.getData();
  }
}


