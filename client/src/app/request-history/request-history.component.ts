import { Component, OnInit } from '@angular/core';
import { WasteManagementService } from '../services/waste-management.service';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class RequestHistoryComponent implements OnInit {
  requests: any[];
  loading: Boolean = true;
  userId: Number;
  constructor(private waste: WasteManagementService, private user: UserService) { }
  
  ngOnInit() {
    // First get user id, then get pickup requests made by user id, then check if each req is serviced
    this.user.getProfile().subscribe(data =>{
      this.userId = data.user._id;
      this.waste.getRequests().then(response =>{
        this.requests = response.requests.filter(el => el.userId == this.userId);
        this.requests.forEach((element) => {
          element.requested = moment(element.requested).format('MMMM Do YYYY');
          this.waste.getSchedule().then(response =>{
            response.schedule.forEach(k => {
              if (k.requestId == element._id) {
                // add schedule attributes
                element.serviced = k.serviced;
                element.start = moment(k.start).format('MMMM Do YYYY');
              }
            });
            this.loading = false;
          }).catch(reason =>{
            console.log(reason);
          });
          });
        
      }).catch(reason=>{});
    }, error =>{
      if (error.status === 403) {
        console.log('redirect');
        
      } 
    });
  }

}
