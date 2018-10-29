import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { AppRoutingModule } from './app-routing.module';
import { LabOperatorDashboardComponent } from './lab-operator-dashboard/lab-operator-dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedPrimeNgModule } from './shared-primeng.module';
import { AuthInterceptor } from "./services/interceptor";
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { WasteManagementService } from './services/waste-management.service';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EhosDashboardComponent } from './ehos-dashboard/ehos-dashboard.component';
import { PickupRequestsComponent } from './pickup-requests/pickup-requests.component';
import { EhosQuickViewComponent } from './ehos-quick-view/ehos-quick-view.component';
import { EhosAuthGuard,LabAuthGuard, AnyAuthGuard, ProfileGuard } from "./guards/auth.guard";
import { Error401Component } from './error401/error401.component';
import { LabInspectionsComponent } from './lab-inspections/lab-inspections.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { LabQuickViewComponent } from './lab-quick-view/lab-quick-view.component';
import { WasteRequestComponent } from './waste-request/waste-request.component';
import { PickupSchedulerComponent } from './pickup-scheduler/pickup-scheduler.component';
import { StorageComponent } from './storage/storage.component';
import { CorrosiveComponent } from './corrosive/corrosive.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { LabInspectionService } from './services/lab-inspection.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    Error404Component,
    LabOperatorDashboardComponent,
    HomeComponent,
    NavbarComponent,
    EhosDashboardComponent,
    PickupRequestsComponent,
    EhosQuickViewComponent,
    Error401Component,
    LabInspectionsComponent,
    AboutComponent,
    ProfileComponent,
    UsersComponent,
    LabQuickViewComponent,
    WasteRequestComponent,
    PickupSchedulerComponent,
    StorageComponent,
    CorrosiveComponent,
    RequestHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    AppRoutingModule,
    SharedPrimeNgModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule
  ],
  providers: [
    AuthService,
    UserService,
    WasteManagementService,    
    EhosAuthGuard,
    LabAuthGuard,
    AnyAuthGuard,
    ProfileGuard,
    LabInspectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
