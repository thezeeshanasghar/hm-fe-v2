
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

  public transaction: TransactionModel[];
  transactionData: any
  userData: any;
  singleUser: any;
  constructor(private gu: GeneralHttpService) {
    
   this.getTransactions();
   //this.getUsers();
  }

  ngOnInit() {

  }

  
  getTransactions() {
    this.gu.getTransections().subscribe(data => {
      // console.log(data.ResponseData)
       this.transaction = data.ResponseData; // transctionDTO -> Accont {}
      console.log(this.transaction);

       this.transaction.forEach(element => {
         this.gu.getAllUsersById(element.AccountID).subscribe(data => {
        
        console.log(data);
         element.Account=data.ResponseData;
       // console.log(element.Account);
      
      }, error => { });
     
        
      });

    }, error => { });
   

   // console.log(this.transaction);

  }




}
