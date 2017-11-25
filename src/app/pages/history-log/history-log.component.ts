import { TransactionModel } from './../../Models/Transaction.model';
import { GeneralHttpService } from './../../services/general-http.service';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../../Models/account.model';


@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html'
})
export class HistoryLogComponent implements OnInit {
  allAccounts: AccountModel[] = [];
  transaction: TransactionModel[] = [];

  constructor(private gu: GeneralHttpService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
    },
      error => {
        console.log(error);
      });
  }

  getLogById(id) {
    this.gu.getTransactionsIdBy(id).subscribe(data => {
      this.transaction = data.ResponseData;

      this.transaction.forEach(element => {
        this.gu.getAccountById(id).subscribe(data => {
          element.Account = data.ResponseData;
        }, error => { console.log(error); });
      });
    }, error => { console.log(error); });
  }
}
