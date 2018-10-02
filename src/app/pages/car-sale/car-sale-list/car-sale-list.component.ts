import { Component, OnInit } from '@angular/core';
import { CarPurchaseService } from '../../../services/car/car-purchase.service';
import { GeneralHttpService } from '../../../services/general-http.service';

@Component({
  selector: 'app-car-sale-list',
  templateUrl: './car-sale-list.component.html',
  styleUrls: ['./car-sale-list.component.css']
})
export class CarSaleListComponent implements OnInit {

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
