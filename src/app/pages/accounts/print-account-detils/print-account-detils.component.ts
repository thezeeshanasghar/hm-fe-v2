import { GeneralHttpService } from './../../../services/general-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-account-detils',
  templateUrl: './print-account-detils.component.html',
  styleUrls: ['./print-account-detils.component.css']
})
export class PrintAccountDetilsComponent implements OnInit {
  todayDate: Date;
  singleUser: any = '';
  selectedAccountTransactions: any = '';
  ip: any;
  port: any;
  constructor(public gu: GeneralHttpService) {
    this.todayDate = new Date();
    this.singleUser = JSON.parse(localStorage.getItem("singleUser"));
    this.selectedAccountTransactions = JSON.parse(localStorage.getItem("selectedAccountTransactions"));

  }

  ngOnInit() {
    this.ip = this.gu.ip;
    this.port = this.gu.port;
    this.singleUser = JSON.parse(localStorage.getItem("singleUser"));
    this.selectedAccountTransactions = JSON.parse(localStorage.getItem("selectedAccountTransactions"));

  }

  getRowTotalUsingIndex(index: number): number {
    let sum = 0;
    for (var i = 0; i <= index; i++) {
      sum += this.selectedAccountTransactions[i].Amount;
    }
    return sum;
  }

}
