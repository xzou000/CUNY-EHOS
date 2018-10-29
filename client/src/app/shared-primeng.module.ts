import {NgModule} from '@angular/core';
import {ButtonModule,StepsModule,InputMaskModule,AutoCompleteModule, DialogModule,CalendarModule, DropdownModule, } from 'primeng/primeng';
import {SidebarModule} from 'primeng/sidebar';
import {GrowlModule} from 'primeng/growl';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ScheduleModule} from 'primeng/schedule';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem, SelectItem} from 'primeng/api';                 //api
//import {DataViewModule} from 'primeng/dataview';

@NgModule({
  declarations: [
  ],
  imports: [
    ButtonModule,
    StepsModule,
    InputMaskModule,
    DialogModule,
    SidebarModule,
    ProgressSpinnerModule,
    GrowlModule,
    AutoCompleteModule, 
    ScheduleModule, 
    CalendarModule, 
    DropdownModule,
    AccordionModule
  ],
  exports: [
    ButtonModule,
    StepsModule,
    InputMaskModule,
    DialogModule,
    SidebarModule,
    ProgressSpinnerModule,
    GrowlModule,
    AutoCompleteModule, 
    ScheduleModule, 
    CalendarModule, 
    DropdownModule,
    AccordionModule
  ],

})
export class SharedPrimeNgModule { }
