import { Component, OnInit } from '@angular/core';
import { GeneralHttpService } from '../../../services/general-http.service';
import * as moment from 'moment';
import { JsonpModule } from '@angular/http';
@Component({
  selector: 'app-print-roznamcha',
  templateUrl: './print-roznamcha.component.html',
  styleUrls: ['./print-roznamcha.component.css']
})
export class PrintRoznamchaComponent implements OnInit {
  currentdate: any = '';
  loading: boolean = false;
  transaction: any[] = [];
  PreviousBalance: number = 0;
  RemainingBalance: number = 0;
  totalIncome: any = 0;
  totalExpense: any = 0;

  constructor(public gu: GeneralHttpService) {

    // this.currentdate = ;
  }

  ngOnInit() {
    this.getTransaction(sessionStorage.getItem("roznamchaData"));
    this.currentdate=sessionStorage.getItem('roznamchaDate')
  }

  getTransaction(data) {

    let d = JSON.parse(data)
    console.log("current data", d.ResponseData.Transactions)
    this.loading = false;

    this.transaction = d.ResponseData.Transactions;
    
    this.PreviousBalance = Number(d.ResponseData.PreviousBalance);// transctionDTO -> Accont {}
    this.RemainingBalance = Number(d.ResponseData.RemainingBalance);// transctionDTO -> Accont {}

    this.transaction.forEach(element => {
      if (element.Amount > 0) {
        this.totalIncome += element.Amount;
      }
      else if (element.Amount < 0) {
        this.totalExpense += element.Amount;
      }
      this.gu.getAccountById(element.AccountID).subscribe(data => {
        element.Account = data.ResponseData;

      }, error => { });
    });


  }


}
