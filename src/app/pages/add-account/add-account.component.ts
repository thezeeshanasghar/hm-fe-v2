import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { GeneralHttpService } from '../../services/general-http.service';
import { AccountModel } from '../../Models/account.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent implements OnInit {

  public form:FormGroup;

  public number:AbstractControl;
  public name:AbstractControl;
  public mobileNumber:AbstractControl;
  public cnic:AbstractControl;
  public address:AbstractControl;
  public amount:AbstractControl;

  constructor(public fb: FormBuilder, public router: Router,private gu: GeneralHttpService) {
    this.form = fb.group({
      'number': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])],
      'mobileNumber': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(3), Validators.maxLength(11)])],
      'cnic': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(1), Validators.maxLength(13)])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'amount': ['0', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(1)])],
      
    });

    this.number = this.form.controls['number'];
    this.name = this.form.controls['name'];
    this.mobileNumber = this.form.controls['mobileNumber'];
    this.cnic = this.form.controls['cnic'];
    this.address = this.form.controls['address'];
    this.amount = this.form.controls['amount'];

  }

  ngOnInit() {
  }

  onSubmit(m) {
    
    let model = new AccountModel();
    model.Id = 0;
    model.Number = this.form.value.number;
    model.Name = this.form.value.name;
    model.MobileNumber = this.form.value.mobileNumber;
    model.CNIC = this.form.value.cnic;
    model.Address = this.form.value.address;
    model.Balance = this.form.value.amount;

    this.gu.postAccount(model).subscribe(data=> {}, error=> {});
    // model

    // this.rs.PostExpenseTransection(em).subscribe(data=>{
    //   console.log(data);

    // },error=>{});

   this.router.navigate(["roznamcha"]);

  }
}
