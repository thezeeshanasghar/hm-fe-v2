import { AmountValidator } from './../../../../assets/validators/amount.valdator';
import { GeneralHttpService } from './../../../services/general-http.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit {

  allAccounts: any[] = [];
  incomsearch = '';
  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;


  constructor(public fb: FormBuilder, public gu: GeneralHttpService, private router: Router) {
    this.form = fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'incomeAmount': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(2)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])]

    });

    this.userAccount = this.form.controls["userAccount"];
    this.incomeAmount = this.form.controls["incomeAmount"];
    this.description = this.form.controls["description"];
  }

  ngOnInit() {
    this.getAllAccount();

  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data => {

      this.allAccounts = data.ResponseData;
      //  console.log(data.ResponseData)
    }, error => { });
  }

  onSubmitIncome(m) {
    //console.log(m);
    var uid = UUID.UUID();
    var date = new Date();
    var dateTime = moment.utc(date).format("DD-MM-YYYY");
    var transaction = {
      AccountID: m.userAccount,
      // Number: uid,
      Amount: m.incomeAmount,
      Date: date,
      Description: m.description

    }
    //console.log(transaction);

    this.gu.PostTransaction(transaction).subscribe(data => {
      //console.log(data)
      this.form.reset();
      // this.router.navigate(["roznamcha"]);
    },
      error => {
        console.log("income error : ", error);

      });
  }


}
