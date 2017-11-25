
import { AccountModel } from './../../Models/account.model';
import { element } from 'protractor';
import { GeneralHttpService } from './../../services/general-http.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roznamcha',
  templateUrl: './roznamcha.component.html'
})
export class RoznamchaComponent implements OnInit {
  grandTotal: any=0.0;
  totalExpense: any=0.0;
  totalIncome: any=0.0;
  singelUser: any=0;

  public transaction: TransactionModel[];
  transactionData: any
  userData: any;
  singleUser: any;
  date; 
   constructor(private gu: GeneralHttpService) {

  this.date=new Date();
    this.getTransactions();
  }

  ngOnInit() {
  }

  getTransactions() {
    this.gu.getTransactions().subscribe(data => {
      this.transaction = data.ResponseData; // transctionDTO -> Accont {}

      this.transaction.forEach(element => {
        if(element.Amount>0)
        {
          this.totalIncome+=element.Amount;
        }
        else{
          this.totalExpense+=element.Amount;
        }

        this.grandTotal= this.totalIncome+this.totalExpense;
        this.gu.getAccountById(element.AccountID).subscribe(data => {
          element.Account = data.ResponseData;

        }, error => { });
      });

    }, error => { });
    
  }

  getUserById(id) {
    this.gu.getAccountById(id).subscribe(data => {
      this.singelUser = data.ResponseData;
    });
  }
}
