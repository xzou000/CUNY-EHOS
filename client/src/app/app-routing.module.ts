import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { LabOperatorDashboardComponent } from './lab-operator-dashboard/lab-operator-dashboard.component';
import { EhosQuickViewComponent } from "./ehos-quick-view/ehos-quick-view.component";
import { EhosDashboardComponent } from './ehos-dashboard/ehos-dashboard.component';
import { PickupRequestsComponent } from './pickup-requests/pickup-requests.component';
import { LabInspectionsComponent } from './lab-inspections/lab-inspections.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EhosAuthGuard,LabAuthGuard,AnyAuthGuard, ProfileGuard } from "./guards/auth.guard";
import {AboutComponent} from "./about/about.component";
import { UsersComponent } from './users/users.component';
import { LabQuickViewComponent } from './lab-quick-view/lab-quick-view.component';
import { Error401Component } from './error401/error401.component';
import { WasteRequestComponent } from './waste-request/waste-request.component';
import { PickupSchedulerComponent } from "./pickup-scheduler/pickup-scheduler.component";
import { StorageComponent } from './storage/storage.component';
import { CorrosiveComponent } from './corrosive/corrosive.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
// All our routes are stored in this variable
const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AnyAuthGuard]}, // Our default path i.e. our homepage
  {path: 'ehos', component: EhosDashboardComponent, canActivate: [EhosAuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'pickup-requests', component: PickupRequestsComponent},
      { path: 'pickup-schedule', component: PickupSchedulerComponent},
      { path: 'lab-inspections', component: LabInspectionsComponent},
      { path: 'home', component:  PickupSchedulerComponent}
    ]
  }, // Our path to the EHOS
  {path:'about', component:AboutComponent},
  {path: 'lab', component: LabOperatorDashboardComponent, canActivate: [LabAuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'waste-pickup', component: WasteRequestComponent },
      { path: 'supply-request', component: Error401Component },
      { path: 'history', component: RequestHistoryComponent },
      { path: 'home', component: LabQuickViewComponent }
    ]
  },
  {path:'storage', component: StorageComponent},
  {path:'corrosive', component: CorrosiveComponent},
  {path:'about', component:AboutComponent},
  { path: 'profile', component:  ProfileComponent, canActivate: [ProfileGuard] },
  { path: '**', component: Error404Component } // A path that is not defined
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forRoot(appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }
