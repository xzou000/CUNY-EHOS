import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
//  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {


 downArrow: string;
 personIcon:string;
 steven:string;
 ZouXiaohang:string;
 Xiaohang:string;
 emma:string;

 constructor() {
   this.personIcon='/assets/businessman-2579301_1280.jpg'
   this.downArrow = '/assets/arrowp.png'
   this.steven='/assets/13321771_1735469733359340_4861809505736691502_n.jpg'
   this.emma='/assets/emma.png'
   this.ZouXiaohang='/assets/ZouXiaohang.jpg'
   this.Xiaohang='/assets/ZouXiaohang copy.jpg'

 }


  ngOnInit() {
  }

}
