import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-exchange-car',
  templateUrl: './list-exchange-car.component.html',
  styleUrls: ['./list-exchange-car.component.css']
})
export class ListExchangeCarComponent implements OnInit {

  filter = '';
  loading = false;
  constructor() { }

  ngOnInit() {
  }

}
