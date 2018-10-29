import { Component, OnInit } from '@angular/core';
import { GeneralHttpService } from '../../../services/general-http.service';

@Component({
  selector: 'app-print-roznamcha-income',
  templateUrl: './print-roznamcha-income.component.html',
  styleUrls: ['./print-roznamcha-income.component.css']
})
export class PrintRoznamchaIncomeComponent implements OnInit {

  currentdate: any = '';
  loading: boolean = false;
  transaction: any[] = [];
  PreviousBalance: number = 0;
  RemainingBalance: number = 0;
  totalIncome: any = 0;
  totalExpense: any = 0;
  incomeTransactions: any[] = [];
  expenseTransactions: any[] = [];

  constructor(public gu: GeneralHttpService) {

    // this.currentdate = ;
  }

  ngOnInit() {
    this.getTransaction(localStorage.getItem("roznamchaData"));
    this.currentdate = localStorage.getItem('roznamchaDate')
  }

  getTransaction(data) {
    this.incomeTransactions = [];
    this.expenseTransactions = [];
    let d = JSON.parse(data)
    console.log("current data", d.ResponseData.Transactions)
    this.loading = false;

    this.transaction = d.ResponseData.Transactions;

    this.PreviousBalance = Number(d.ResponseData.PreviousBalance);// transctionDTO -> Accont {}
    this.RemainingBalance = Number(d.ResponseData.RemainingBalance);// transctionDTO -> Accont {}

    this.transaction.forEach(element => {
      if (element.Amount > 0) {
        this.totalIncome += element.Amount;
        this.incomeTransactions.push(element);
      }
      else if (element.Amount < 0) {
        this.totalExpense += element.Amount;
        this.expenseTransactions.push(element)
      }
      this.gu.getAccountById(element.AccountID).subscribe(data => {
        element.Account = data.ResponseData;

      }, error => { });
    });


  }


}
