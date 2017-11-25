import { TransactionModel } from './../../Models/Transaction.model';
import { GeneralHttpService } from './../../services/general-http.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.css']
})
export class HistoryLogComponent implements OnInit {
  allAccounts;
  public transaction: TransactionModel[];
  modal;
  date;

  constructor(private gu:GeneralHttpService) {
    this.date=new Date();
    this.getTransactions();
    this.getAllUsers();
   }

  ngOnInit() {
  }
  getAllUsers(){
    this.gu.getAllAccounts().subscribe(data=>{
      this.allAccounts=data.ResponseData;
      console.log(data);

    },
    error=>{

    });

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

  getLogById(id)
  {
    console.log(id)
    this.gu.getTransactionsIdBy(id).subscribe(data=>{
      this.transaction=data.ResponseData;
      console.log(this.transaction);

      this.transaction.forEach(element => {
      
        this.gu.getAccountById(id).subscribe(data => {
          element.Account = data.ResponseData;

        }, error => { });
      });
    },error=>{});
    
  
  }

}
