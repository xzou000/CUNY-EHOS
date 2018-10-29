import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-ehos-dashboard',
  templateUrl: './ehos-dashboard.component.html',
  styleUrls: ['./ehos-dashboard.component.css'],
  providers: [MessageService]
  // encapsulation: ViewEncapsulation.None
})
export class EhosDashboardComponent implements OnInit {

  ngOnInit() {

  }

}
