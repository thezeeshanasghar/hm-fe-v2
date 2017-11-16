import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AmountValidator } from '../../../assets/validators/index';
import { GeneralHttpService } from '../../services/general-http.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})
export class ExpenseComponent {

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

    this.getAllAccount();
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data=> {console.log(data.ResponseData)}, error=> {})
  }


}
