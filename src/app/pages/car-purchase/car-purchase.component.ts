import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-car-purchase',
  templateUrl: './car-purchase.component.html',
  styleUrls: ['./car-purchase.component.css']
})
export class CarPurchaseComponent implements OnInit {
  // allAccounts: any[] = [];
  // changeClass = false;
  // showSales = false;

  // showBuyer = true;
  // showSeller = true;
 

  constructor(public router:Router) {
 
  }

  ngOnInit() {
    // this.getAllAccount();
  }

  // showSalesFormToggle() {
  //   this.showSales = !this.showSales;
  // }

  // getAllAccount() {
  //   this.gu.getAllAccounts().subscribe(data => {
  //     this.allAccounts = data.ResponseData;
  //     console.log(this.allAccounts)
  //   }, error => { });
  // }

  // changeCheckboxBuyer(c) {
  //   // console.log("checkbox ");
  //   this.showBuyer = !this.showBuyer;
  //   console.log(this.showBuyer)
  // }
  // changeCheckboxSeller(c) {

  //   this.showSeller = !this.showSeller;

  // }



}

