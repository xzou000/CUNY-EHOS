import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WasteManagementService } from '../services/waste-management.service';
import * as moment from 'moment';
import { AccordionModule } from 'primeng/accordion'; 
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-pickup-requests',
  templateUrl: './pickup-requests.component.html',
  styleUrls: ['./pickup-requests.component.css'],
  providers: [MessageService]
  // encapsulation: ViewEncapsulation.None
})
export class PickupRequestsComponent implements OnInit {
    requests: any[];
    requestItems: any[];
    date: Date;
    requestId: Number;
    index: Number;
    dialog: Boolean = false;
    msgs: Message[] = [];
    @ViewChild('requested') requested: ElementRef;
    @ViewChild('requester') requester: ElementRef;
    @ViewChild('location') location: ElementRef;
    
    constructor(private waste: WasteManagementService, private messageService: MessageService, private user: UserService) {}
    wastePickupDialog(i){
        this.dialog = true;
        this.requester.nativeElement.value = this.requests[Number(i)].name;
        this.requested.nativeElement.value = this.requests[Number(i)].requested;
        this.location.nativeElement.value = this.requests[Number(i)].location;
        this.requestItems = this.requests[Number(i)].items;
        this.requestId = this.requests[Number(i)]._id;
        this.index = Number(i);
    }
    schedulePickup() {
        this.dialog = false;
        let pickup = {
            requestId: this.requestId, // the pickup requester
            start: moment(this.date).format(),
            eventType: 1,
            serviced: false
        }
        this.waste.schedulePickup(pickup).subscribe(
            response => {
                if (response.success) {
                    // Must patch the pending attribute inside the Waste Pickups table, unless we decide to use a trigger for this.
                    this.waste.isScheduled({_id:this.requestId, pending:false}).subscribe(valid =>{},error =>{
                        this.messageService.add({severity: 'error', summary: 'ERROR!', detail: 'An error occured: \n' + response.message});                                                                        
                    });
                    this.requests[Number(this.index)].pending = false; // Update the local array
                    this.messageService.add({severity: 'success', summary: 'Scheduled!', detail: 'Request has been scheduled! Take a look at the updated schedule to make further updates.'});                            
                }
                else {
                    this.messageService.add({severity: 'error', summary: 'ERROR!', detail: 'An error occured: \n' + response.message});                                                
                }
              },
            error => {
                this.messageService.add({severity: 'error', summary: 'ERROR!', detail: 'An error occured: \n' + error});                                                
            }
        );
    }
    ngOnInit() {
        this.waste.getRequests().then(response => {
            this.requests = response.requests;
            this.requests.forEach((element) => {
                element.requested = moment(element.requested).format('MMMM Do YYYY');
                });
            }).catch(reason => {
                if (reason.status === 403) {
                  // redirect to login page
                  console.log("Your session has timed out, returning to login screen");
                }
        }).then( done =>{
            this.requests.forEach((element,index) => {
                this.user.getUser(element.userId).subscribe(response => {
                    this.requests[index].name = response.user.first + " " + response.user.last;
                });
            });
        });
    }

}
