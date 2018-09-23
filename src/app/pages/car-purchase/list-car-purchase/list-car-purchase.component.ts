import { GeneralHttpService } from './../../../services/general-http.service';
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
  ip = this.gu.ip;
  sellersList: any[] = [];
  buyersList: any[] = [];
  car: any = [];
  witnessList: any[] = [];

  constructor(public purchaseService: CarPurchaseService, public gu: GeneralHttpService) { }

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
    // console.log("deal : ", deal)
    this.selectedDeal = deal;
    this.sellersList = deal.Sellers;
    this.buyersList = deal.Buyers;
    this.car = deal.Car
    this.witnessList = deal.Witnesses

  }



}
