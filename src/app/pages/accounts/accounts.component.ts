import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit} from '@angular/core';
import { GeneralHttpService } from '../../services/general-http.service';
import { AccountModel } from '../../Models/account.model';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  allAccounts: AccountModel[]=[];
  singleUser: AccountModel;
  grandTotal: number=0.0;
  totalExpense: number=0.0;
  totalIncome: number=0.0;
  
  transaction: TransactionModel[] = [];

  constructor(private gu: GeneralHttpService) { }

  
  ngOnInit() {
    console.log(this.allAccounts);
   
 this.getAllAccounts();
    
  }

  getAllAccounts() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
    }, error => { });
  }

  getLogById(id) {
    this.gu.getTransactionsIdBy(id).subscribe(data => {
      this.transaction = data.ResponseData;

      this.transaction.forEach(element => {
        if(element.Amount>0)
        {
          this.totalIncome+=element.Amount;
        }
        else{
          this.totalExpense+=element.Amount;
        }

        this.grandTotal= this.totalIncome+this.totalExpense;
        this.gu.getAccountById(id).subscribe(data => {
          element.Account = data.ResponseData;
          this.singleUser=element.Account
        }, error => { console.log(error); });
      });
    }, error => { console.log(error); });
  }

}
