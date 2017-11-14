import { AmountValidator } from './../../../assets/validators/amount.valdator';

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-transection',
  templateUrl: './expense-transection.component.html',
  styleUrls: ['./expense-transection.component.css']
})
export class ExpenseTransectionComponent implements OnInit {

  public form:FormGroup;
  public userAccount:AbstractControl;
  public loanAmount:AbstractControl;
  public description:AbstractControl;
  date=new Date();
  userData=[];


  constructor(public fb:FormBuilder,public router:Router) { 
    
    this.date=new Date();
   // this.getAllUsers();

    this.form=fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'loanAmount': ['', Validators.compose([Validators.required, AmountValidator.validate,  Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])],

    });
    this.userAccount=this.form.controls["userAccount"];
    this.loanAmount=this.form.controls["loanAmount"];
    this.description=this.form.controls["description"];
  }


  ngOnInit() {
  }

  onSubmit(m){
    console.log(JSON.stringify(m));
    
    // let em:any;
    // em={
    //   AccountID:m.userAccount,
    //   TransectionDate:this.date,
    //   ExpenseDR:m.loanAmount,
    //   Description:m.description,
    //   PreviousExpenseDR:40000
      
    // }
    // console.log(em);

    // this.rs.PostExpenseTransection(em).subscribe(data=>{
    //   console.log(data);

    // },error=>{});

  //  this.router.navigate(["roznamcha"]);

  }

}
