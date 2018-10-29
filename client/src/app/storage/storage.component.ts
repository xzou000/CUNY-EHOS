import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class StorageComponent implements OnInit {


corrisive: string;
explosive:string;
flamableL:string;
flamableS:string;
gas:string;
oxidizer:string;
radiation:string;
toxic:string;
miscellaneous:string;



constructor() {
  this.corrisive='/assets/hazard/corrisive.png'
  this.explosive='/assets/hazard/explosive.png'
  this.flamableL='/assets/hazard/flamableL.png'
  this.flamableS='/assets/hazard/flamableS.png'
  this.gas='/assets/hazard/gas.png'
  this.oxidizer='/assets/hazard/oxidizer.png'
  this.radiation='/assets/hazard/radiation.png'
  this.toxic='/assets/hazard/toxic.png'
  this.miscellaneous='/assets/hazard/miscellaneous.png'
}


  ngOnInit() {
  }

}
