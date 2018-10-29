import { Component, OnInit } from '@angular/core';
import { ITEM } from '../mock';
import { WasteManagementService } from "../services/waste-management.service";
import { UserService } from '../services/user.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-waste-request',
  templateUrl: './waste-request.component.html',
  styleUrls: ['./waste-request.component.css'],
  providers: [MessageService]  
  //encapsulation: ViewEncapsulation.None
})
export class WasteRequestComponent implements OnInit {
  wastePickupForm: FormGroup;
  wasteItems: FormArray;
  wasteForm: FormGroup;
  chemicals: FormArray;
  chemicalForm: FormGroup;
  loading: Boolean = false;
  msgs: Message[] = [];
  requester: String;
  location: String;
  
  constructor(private formBuilder: FormBuilder, private waste: WasteManagementService, private user: UserService, private messageService: MessageService) {
    this.createForm();
   }
  createChemical(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      percentFraction: ['', Validators.required]
    });
  }
  addChemical(i) {
    this.chemicals = (this.wasteForm.get('wasteItems') as FormArray).controls[i].get('chemicals') as FormArray;
    this.chemicals.push(this.createChemical());
    console.log(this.wasteForm);
  }
  removeChemical(i,j) {
    this.chemicals = (this.wasteForm.get('wasteItems') as FormArray).controls[i].get('chemicals') as FormArray;
    if (this.chemicals.length > 1) {
      this.chemicals.removeAt(Number(j));
    }
  }
  createForm() {
    this.wasteForm = this.formBuilder.group({
      wasteItems: this.formBuilder.array([ this.createWasteItem() ])
    });

  }
  createWasteItem(): FormGroup {
    return this.formBuilder.group({
      containerType: ['', Validators.required],
      hazardClass: ['', Validators.required],
      quantity: ['', Validators.required],
      chemicals: this.formBuilder.array([ this.createChemical() ])
    });
  }
  addWasteItem() {
    this.wasteItems = this.wasteForm.get('wasteItems') as FormArray;
    this.wasteItems.push(this.createWasteItem());
  }
  removeWasteItem(i) {
    this.wasteItems = <FormArray>this.wasteForm.controls['wasteItems'];
    if (this.wasteItems.length > 1) {
      this.wasteItems.removeAt(Number(i));
    }
  }

  createRequest() {
    this.loading = true;
    let request = {
      requester: this.requester,
      location: this.location,
      items: this.wasteForm.get('wasteItems').value
    }
    
    this.waste.createRequest(request).then(value => {
      if (!value.success) {
        this.messageService.add({severity: 'error', summary: 'ERROR!', detail: 'Look over details and try again.'});                            
      }
      else{
        this.messageService.add({severity: 'success', summary: 'Requested!', detail: 'Waste pickup request was successfully created!'});                            
      }
      this.loading = false;
      this.wasteForm.reset();
      // Loading done
    }).catch( reason => {
      console.log(reason);
      this.loading = false;
    });
  }
  ngOnInit() {
    this.user.getProfile().subscribe(user => {
      this.requester = user.user._id; 
      this.location = user.user.building + ", Room " + user.user.room;
    }, 
      error => {
        console.log(error);
    });
  }

}
