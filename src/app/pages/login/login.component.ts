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
  changeClass = false;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  myMessage = '';
  successTrigger = false;
  errorTrigger = false;

  constructor(private fb: FormBuilder, private router: Router) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }


  onSubmit(m) {
    this.changeClass = true;
    console.log(m)

    if (m.email == "admin@hm.com" && m.password == 'admin') {

      localStorage.clear()

      let obj: any = {
        Authorized: true,
        email: m.email,

        role: 'admin'
      }
      window.localStorage.setItem("Authorized", JSON.stringify(obj));
      this.router.navigate(['dashboard']);

    }
    else if (m.email == "imranlava@hm.com" && m.password == 'imranlava') {

      localStorage.clear()

      let obj: any = {
        Authorized: true,
        email: m.email,

        role: 'write'
      }
      window.localStorage.setItem("Authorized", JSON.stringify(obj));
      this.router.navigate(['dashboard']);

    }
    else if (m.email == "munawarali@hm.com" && m.password == 'munawarali') {

      localStorage.clear()

      let obj: any = {
        Authorized: true,
        email: m.email,
        role: 'read'
      }
      window.localStorage.setItem("Authorized", JSON.stringify(obj));
      this.router.navigate(['dashboard']);

    }

    else if (m.email != "admin@hm.com" || m.password != 'admin') {
      localStorage.clear()
      this.myMessage = 'username OR password is invalid.';
      this.errorTrigger = true;

    }



  }

  ngOnInit() {
  }



}
