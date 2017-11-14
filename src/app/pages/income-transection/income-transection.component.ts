import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-transection',
  templateUrl: './income-transection.component.html',
  styleUrls: ['./income-transection.component.css']
})
export class IncomeTransectionComponent implements OnInit {

  date: Date;
  userData: any;
  public form:FormGroup;
  public userAccount:AbstractControl;
  public incomeAmount:AbstractControl;
  public description:AbstractControl;
  constructor(private fb:FormBuilder,private router:Router) { 

    this.date=new Date();
    //this.getAllUsers();
    this.form=fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'incomeAmount': ['', Validators.compose([Validators.required, AmountValidator.validate,  Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])],

    });
    this.userAccount=this.form.controls["userAccount"];
    this.incomeAmount=this.form.controls["incomeAmount"];
    this.description=this.form.controls["description"];
  }

  ngOnInit() {
  }
  onSubmit(m){
    console.log(m);
    
    let em:any;
    em={
      AccountID:m.userAccount,
      TransectionDate:this.date,
      IncomeCR:m.incomeAmount,
      Description:m.description,
      
      
    }
    console.log(em);

    // this.rs.PostIncomeTransection(em).subscribe(data=>{
    //   console.log(data);

    // },error=>{});

    //this.router.navigate(["roznamcha"]);

  }

}
