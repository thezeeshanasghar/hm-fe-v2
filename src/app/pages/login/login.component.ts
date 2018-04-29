import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../../assets/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(private fb:FormBuilder,private router:Router) { 

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }


  onSubmit(m){
    this.router.navigate(['dashboard']);



  }

  ngOnInit() {
  }



}
