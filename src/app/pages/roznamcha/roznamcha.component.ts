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
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-roznamcha',
  templateUrl: './roznamcha.component.html'
})
export class RoznamchaComponent implements OnInit {
  DeleteItemId;
  EditItemId;
  accountId
  loading = false;

  PreviousBalance = 0;
  RemainingBalance = 0;

  public transaction: TransactionModel[];
  date = new Date();


  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;
  totalIncome: number = 0;
  totalExpense: number = 0;
  constructor(public fb: FormBuilder, private gu: GeneralHttpService, private modalService: BsModalService, private router: Router) {
    this.date = new Date();
  }
  openInNewTab() {
    var url = "/printRoznamcha"
    var win = window.open(url, '_blank');
    win.focus();
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
    this.loading = true;
    var date = new Date();
    var dateTime = moment.utc(date).format("MM/DD/YYYY");
    this.getTransactions(dateTime);
  }

  deleteTransaction() {

    //this.modalRefEdit = this.modalService.show(TemplateRef);
    this.gu.deleteTransaction(this.DeleteItemId).subscribe(data => {

      // this.modalRefMessage.content();
      if (data.IsSuccess) {
        this.router.navigate(['accounts']);
      }

    }, error => {

    });
  }


  editTransactionIncome(m) {


    var uid = UUID.UUID();
    var date = new Date();
    var dateTime = moment.utc(date).format("MM/DD/YYYY");
    var transaction = {
      Id: this.EditItemId,
      AccountID: this.accountId,
      Number: uid,
      Amount: m.incomeAmount,
      Date: dateTime,
      Description: m.description

    }
    this.gu.EditTransaction(this.EditItemId, transaction).subscribe(data => {
      this.form.reset();

      this.getTransactions(dateTime)
      // this.router.navigate(['accounts']);
    },
      error => { });
  }

  editTransactionExpense(m) {

    var uid = UUID.UUID();
    var date = new Date();
    var dateTime = moment.utc(date).format("DD/MM/YYYY");
    var transaction = {
      Id: this.EditItemId,
      AccountID: this.accountId,
      Number: uid,
      Amount: "-" + m.incomeAmount,
      Date: dateTime,
      Description: m.description

    }


    this.gu.EditTransaction(this.EditItemId, transaction).subscribe(data => {

      this.form.reset();
      this.getTransactions(dateTime)
      // this.router.navigate(['accounts']);
    },
      error => { });
  }
  getTransactionbyDate(d) {

    this.transaction = [];
    var dd = d.date.month + "-" + d.date.day + "-" + d.date.year;


    let dateTime = moment.utc(dd).format("MM/DD/YYYY");//

    this.getTransactions(dateTime);

    this.transaction.forEach(element => {
      if (element.Amount > 0) {
        this.totalIncome += element.Amount;
      }
      else if (element.Amount < 0) {
        this.totalExpense += element.Amount;
      }

      // this.previousGrandTotal=this.previousTotalIncome+this.previousTotalExpense;
      this.gu.getAccountById(element.AccountID).subscribe(data => {
        element.Account = data.ResponseData;
      }, error => { });
    });


  }


  getTransactions(date: any) {
    this.loading = true;
    sessionStorage.setItem("roznamchaDate", date);

    this.gu.getTransactions(date).subscribe(data => {
      this.loading = false;
      sessionStorage.setItem("roznamchaData", '');
      sessionStorage.setItem("roznamchaData", JSON.stringify(data));

      this.transaction = data.ResponseData.Transactions;
      // sessionStorage.setItem("roznamchaTRansactions", JSON.stringify(this.transaction));
      this.PreviousBalance = Number(data.ResponseData.PreviousBalance);// transctionDTO -> Accont {}
      this.RemainingBalance = Number(data.ResponseData.RemainingBalance);// transctionDTO -> Accont {}

      this.transaction.forEach(element => {
        if (element.Amount > 0) {
          this.totalIncome += element.Amount;
        }
        else if (element.Amount < 0) {
          this.totalExpense += element.Amount;
        }
        this.gu.getAccountById(element.AccountID).subscribe(data => {
          element.Account = data.ResponseData;

        }, error => { });
      });

    }, error => { });

  }

}
