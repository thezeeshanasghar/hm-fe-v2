import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-sale-list',
  templateUrl: './car-sale-list.component.html',
  styleUrls: ['./car-sale-list.component.css']
})
export class CarSaleListComponent implements OnInit {

  filter='';
  loading=false
  constructor() { }

  ngOnInit() {
  }

}
