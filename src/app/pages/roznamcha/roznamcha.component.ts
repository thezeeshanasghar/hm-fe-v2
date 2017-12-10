import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AccountModel } from './../../Models/account.model';
import { element } from 'protractor';
import { GeneralHttpService } from './../../services/general-http.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-roznamcha',
  templateUrl: './roznamcha.component.html'
})
export class RoznamchaComponent implements OnInit {
  DeleteItemId;
  EditItemId;
  accountId
  grandTotal: any=0.0;
  totalExpense: any=0.0;
  totalIncome: any=0.0;
  public transaction: TransactionModel[];
  date; 

  
  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;
   constructor(public fb: FormBuilder,private gu: GeneralHttpService, private modalService: BsModalService,private router:Router) {
  this.date=new Date();


  }

  modalRefDelete: BsModalRef;
   modalRefEdit: BsModalRef;

  openModalDelete(template: TemplateRef<any>,id) {
    this.modalRefDelete = this.modalService.show(template);
    this.DeleteItemId=id;
  }

  openModalEdit(template: TemplateRef<any>,id,AccountId){
    this.modalRefEdit = this.modalService.show(template);   
    this.EditItemId=id;
    this.accountId=AccountId;


    this.form =this.fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'incomeAmount': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
  
    });
  
    this.userAccount = this.form.controls["userAccount"];
    this.incomeAmount = this.form.controls["incomeAmount"];
    this.description = this.form.controls["description"];

  }

  ngOnInit() {
    this.getTransactions(); 
  }

  deleteTransaction(){
    console.log(this.DeleteItemId);
    this.modalRefEdit=this.modalService.show(TemplateRef);
    this.gu.deleteTransaction(this.DeleteItemId).subscribe(data=>{

     // this.modalRefMessage.content();
     if(data.IsSuccess)
     {
      this.router.navigate(['accounts']);
     }

    },error=>{

    });
  }

  editTransaction(m){
    console.log(this.EditItemId);
    console.log(m)

    
      console.log(m);
      var uid = UUID.UUID();
      var date = new Date();
      var dateTime = moment.utc(date).format("DD-MM-YYYY");
      var transaction = {
        Id:this.EditItemId,
        AccountID: this.accountId,
        Number: uid,
        Amount: m.incomeAmount,
        Date: dateTime,
        Description: m.description
  
      }
      console.log(transaction);
  
      this.gu.EditTransaction(this.EditItemId,transaction).subscribe(data => {
        //console.log(data)
        this.router.navigate(['accounts']);
      },
        error => { });
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

}
