import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-account-detils',
  templateUrl: './print-account-detils.component.html',
  styleUrls: ['./print-account-detils.component.css']
})
export class PrintAccountDetilsComponent implements OnInit {

  singleUser: any = '';
  selectedAccountTransactions: any = '';
  constructor() {

    this.singleUser = JSON.parse(sessionStorage.getItem("singleUser"));
    this.selectedAccountTransactions = JSON.parse(sessionStorage.getItem("selectedAccountTransactions"));

  }

  ngOnInit() {
    this.singleUser = JSON.parse(sessionStorage.getItem("singleUser"));
    this.selectedAccountTransactions = JSON.parse(sessionStorage.getItem("selectedAccountTransactions"));

  }

  getRowTotalUsingIndex(index: number): number {
    let sum = 0;
    for (var i = 0; i <= index; i++) {
      sum += this.selectedAccountTransactions[i].Amount;
    }
    return sum;
  }

}
