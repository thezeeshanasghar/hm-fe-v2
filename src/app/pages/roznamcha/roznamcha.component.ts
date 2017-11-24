
import { AccountModel } from './../../Models/account.model';
import { element } from 'protractor';
import { GeneralHttpService } from './../../services/general-http.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roznamcha',
  templateUrl: './roznamcha.component.html',
  styleUrls: ['./roznamcha.component.css']
})
export class RoznamchaComponent implements OnInit {
  singelUser: any;

  public transaction: TransactionModel[];
  transactionData: any
  userData: any;
  singleUser: any;
  constructor(private gu: GeneralHttpService) {
    this.getTransactions();
  }

  ngOnInit() {
  }

  getTransactions() {
    this.gu.getTransactions().subscribe(data => {
      this.transaction = data.ResponseData; // transctionDTO -> Accont {}

      this.transaction.forEach(element => {
        this.gu.getAccountById(element.AccountID).subscribe(data => {
          element.Account = data.ResponseData;
        }, error => { });
      });

    }, error => { });
  }

  getUserById(id){
    this.gu.getAccountById(id).subscribe(data=>{
      this.singelUser=data.ResponseData;
    });
  }
}
