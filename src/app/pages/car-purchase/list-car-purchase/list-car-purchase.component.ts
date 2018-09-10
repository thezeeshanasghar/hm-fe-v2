import { CarPurchaseService } from './../../../services/car/car-purchase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-car-purchase',
  templateUrl: './list-car-purchase.component.html',
  styleUrls: ['./list-car-purchase.component.css']
})
export class ListCarPurchaseComponent implements OnInit {
  filter = '';
  loading = false;
  selectedDeal: any[] = [];

  purchasedCarList: any[] = [];

  constructor(public purchaseService: CarPurchaseService) { }

  ngOnInit() {
    this.getCarList();
  }

  getCarList() {
    this.loading = true;
    this.purchaseService.getPurchaseCarList().subscribe(data => {
      this.loading = false;
      this.purchasedCarList = data;
    }, error => {
    });
  }

  setDeal(deal) {
    console.log("deal : ", deal)
    this.selectedDeal = deal;
  }



}
