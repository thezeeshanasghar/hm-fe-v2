import { TransactionModel } from './../../Models/Transaction.model';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AmountValidator } from '../../../assets/validators/index';
import { GeneralHttpService } from '../../services/general-http.service';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})
export class ExpenseComponent {
  allAccounts:any[]=[];
  changeClass=false;
  
  public form: FormGroup;
  public userAccount: AbstractControl;
  public loanAmount: AbstractControl;
  public description: AbstractControl;

  constructor(public fb: FormBuilder, public router: Router,private gu: GeneralHttpService) {
    this.form = fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'loanAmount': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.userAccount = this.form.controls["userAccount"];
    this.loanAmount = this.form.controls["loanAmount"];
    this.description = this.form.controls["description"];
    // var date=new Date();
    // var dateTime = moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
    //  console.log(dateTime);

   

    this.getAllAccount();
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data=> {
      
      this.allAccounts=data.ResponseData;
    //  console.log(data.ResponseData)
    }, error=> {})
  }

  onSubmitExpense(m)
  {
    //console.log(m);
    var uid=UUID.UUID();
    var date=new Date();
    var dateTime = moment.utc(date).format("DD-MM-YYYY");
      var trans={
      
      AccountID:m.userAccount,
      Number:uid,
      Amount:"-"+m.loanAmount,
      Description: m.description,
      Date:dateTime
    }
    //console.log(transaction);

    this.gu.PostTransaction(trans).subscribe(data=>{
      console.log(data);
      this.router.navigate(["allUsers"]);
    },
    error=>{});
  }

  
    

  
}
