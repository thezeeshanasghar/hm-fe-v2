import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-sale',
  templateUrl: './car-sale.component.html',
  styleUrls: ['./car-sale.component.css']
})
export class CarSaleComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
