import { Router } from '@angular/router';
import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public form:FormGroup;
  public name:AbstractControl;
 
  public email:AbstractControl;
  public cnic:AbstractControl;
  public address:AbstractControl;
  public amount:AbstractControl;
  public contact:AbstractControl;
  constructor( public fb:FormBuilder,public router:Router) {
    this.form=fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(35)])],
      'cnic': ['', Validators.compose([Validators.required,AmountValidator.validate, Validators.minLength(3),Validators.maxLength(13)])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      'amount': ['0', Validators.compose([Validators.required, AmountValidator.validate,  Validators.minLength(1)])],
      'contact': ['', Validators.compose([Validators.required,AmountValidator.validate, Validators.minLength(3),Validators.maxLength(11)])],


    });

    this.name = this.form.controls['name'];
    this.cnic = this.form.controls['cnic'];
    this.address = this.form.controls['address'];
    this.email = this.form.controls['email'];
    this.amount = this.form.controls['amount'];
    this.contact = this.form.controls['contact'];

     }

  ngOnInit() {
  }
  onSubmit(m)
  {
    console.log(m);

  }

}
