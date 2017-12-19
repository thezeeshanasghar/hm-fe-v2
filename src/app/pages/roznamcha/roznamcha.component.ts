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
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-roznamcha',
  templateUrl: './roznamcha.component.html'
})
export class RoznamchaComponent implements OnInit {
  DeleteItemId;
  EditItemId;
  accountId
  grandTotal: any = 0.0;
  totalExpense: any = 0.0;
  totalIncome: any = 0.0;
  previousGrandTotal: Number = 0.0;

  public transaction: TransactionModel[];
  date = new Date();


  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;

  constructor(public fb: FormBuilder, private gu: GeneralHttpService, private modalService: BsModalService, private router: Router) {
    this.date = new Date();
  }

  modalRefDelete: BsModalRef;
  modalRefEdit: BsModalRef;

  openModalDelete(template: TemplateRef<any>, id) {
    this.modalRefDelete = this.modalService.show(template);
    this.DeleteItemId = id;
  }

  openModalEdit(template: TemplateRef<any>, id, AccountId) {
    this.modalRefEdit = this.modalService.show(template);
    this.EditItemId = id;
    this.accountId = AccountId;


    this.form = this.fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'incomeAmount': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])]

    });

    this.userAccount = this.form.controls["userAccount"];
    this.incomeAmount = this.form.controls["incomeAmount"];
    this.description = this.form.controls["description"];

  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false,
    editableDateField: false,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }

  };
  todaydate = new Date()
  // Initialized to specific date (09.10.2018).
  public model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth() + 1, day: this.todaydate.getDate() }, filter: "all" };

  ngOnInit() {
    var date = new Date();
    var dateTime = moment.utc(date).format("MM/DD/YYYY");
    this.getTransactions(dateTime);
  }

  deleteTransaction() {
    console.log(this.DeleteItemId);
    //this.modalRefEdit = this.modalService.show(TemplateRef);
    this.gu.deleteTransaction(this.DeleteItemId).subscribe(data => {

      // this.modalRefMessage.content();
      if (data.IsSuccess) {
        this.router.navigate(['accounts']);
      }

    }, error => {

    });
  }

  getTransactionbyDate(d) {
    console.log(d);

    let dateTime = d.date.month + "-" + d.date.day + "-" + d.date.year;
    this.getTransactions(dateTime);
    this.totalExpense = 0.0;
    this.totalExpense = 0.0;
    this.grandTotal = 0.0;

    // transctionDTO -> Accont {}
    console.log(this.transaction);

    this.transaction.forEach(element => {
      if (element.Amount > 0 && element.Date.toString() == dateTime) {
        this.totalIncome += element.Amount;
      }
      else if (element.Amount < 0 && element.Date.toString() == dateTime) {
        this.totalExpense += element.Amount;
      }

      this.grandTotal = this.totalIncome + this.totalExpense;
      //this.previousGrandTotal=this.previousTotalIncome+this.previousTotalExpense;
      // this.gu.getAccountById(element.AccountID).subscribe(data => {
      //   element.Account = data.ResponseData;

      // }, error => { });
    });


  }

  editTransactionIncome(m) {
    console.log(this.EditItemId);
    console.log(m)


    console.log(m);
    var uid = UUID.UUID();
    var date = new Date();
    var dateTime = moment.utc(date).format("DD-MM-YYYY");
    var transaction = {
      Id: this.EditItemId,
      AccountID: this.accountId,
      Number: uid,
      Amount: m.incomeAmount,
      Date: dateTime,
      Description: m.description

    }
    console.log(transaction);

    this.gu.EditTransaction(this.EditItemId, transaction).subscribe(data => {
      //console.log(data)
      this.router.navigate(['accounts']);
    },
      error => { });
  }
  
  editTransactionExpense(m) {
    console.log(this.EditItemId);
    console.log(m)


    console.log(m);
    var uid = UUID.UUID();
    var date = new Date();
    var dateTime = moment.utc(date).format("DD-MM-YYYY");
    var transaction = {
      Id: this.EditItemId,
      AccountID: this.accountId,
      Number: uid,
      Amount:"-"+m.incomeAmount,
      Date: dateTime,
      Description: m.description

    }
    console.log(transaction);

    this.gu.EditTransaction(this.EditItemId, transaction).subscribe(data => {
      //console.log(data)
      this.form.reset();
      this.router.navigate(['accounts']);
    },
      error => { });
  }
  
  getTransactions(date: any) {


    this.gu.getTransactions(date).subscribe(data => {
      console.log(Number(data.ResponseData.PreviousBalance));
      this.transaction = data.ResponseData.Transactions;
      this.previousGrandTotal=Number(data.ResponseData.PreviousBalance);// transctionDTO -> Accont {}
      //console.log(this.transaction);

      this.transaction.forEach(element => {

        if (element.Amount > 0) {
          this.totalIncome += element.Amount;
        }
        else if (element.Amount < 0) {
          this.totalExpense += element.Amount;
        }


        this.grandTotal = this.totalIncome + this.totalExpense;
        //this.previousGrandTotal=this.previousTotalIncome+this.previousTotalExpense;
        this.gu.getAccountById(element.AccountID).subscribe(data => {
          element.Account = data.ResponseData;

        }, error => { });
      });

    }, error => { });

  }

}
