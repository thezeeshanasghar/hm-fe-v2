import { AccountsComponent } from './../accounts.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TransactionModel } from './../../../Models/Transaction.model';
import { Response, Http } from '@angular/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';


import { AmountValidator } from '../../../../assets/validators/index';
import { GeneralHttpService } from '../../../services/general-http.service';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})
export class ExpenseComponent {

  @ViewChild('accounts') accountsComponent: any;
  expenseSearch=''
  allAccounts: any[] = [];
  changeClass = false;

  public form: FormGroup;
  public userAccount: AbstractControl;
  public loanAmount: AbstractControl;
  public description: AbstractControl;
  message: string='';

  constructor(public fb: FormBuilder, public router: Router, private gu: GeneralHttpService, private modalService: BsModalService) {
    this.form = fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'loanAmount': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(2)])],
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
    this.gu.getAllAccounts().subscribe(data => {

      this.allAccounts = data.ResponseData;
      //  console.log(data.ResponseData)
    }, error => { })
  }
  modalRef: BsModalRef;
  closeModal(template: AccountsComponent) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmitExpense(m) {
    //console.log(m);
    var uid = UUID.UUID();
    var date = moment().format("YYYY-MM-DD hh:mm:ss a")//new Date();
    var dateTime = moment.utc(date).format("DD-MM-YYYY");
    var trans = {

      AccountID: m.userAccount,
      // Number:uid,
      Amount: "-" + m.loanAmount,
      Description: m.description,
      Date: date
    }
    //console.log(transaction);

    this.gu.PostTransaction(trans).subscribe(data => {

      // var account = new AccountsComponent(this.fb, this.gu, this.modalService)
      // account.getAllAccounts();

      this.accountsComponent.getAllAccounts();
      // this.router.navigate(['../accounts'])
      console.log(data);
      //this.closeModal();
      this.form.reset();
      this.message="record added successfully"

      //this.form.controls["loanAmount"].reset();;
      // this.router.navigate(["roznamcha"]);
    },
      error => {
        console.log("expense error : ", error);
      });
  }





}
