import { GeneralHttpService } from './../../services/general-http.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-udhar',
  templateUrl: './udhar.component.html'
  
})
export class UdharComponent implements OnInit {
  vehicalList = ['LHR 1234', 'LHQ 3456', 'LHE 5463', 'LHR 4567', 'LHE 6789', 'LHQ 2345'];
  
  public form: FormGroup;
  public vehical: AbstractControl;
  public amountPaid:AbstractControl;
  public nextDueDate:AbstractControl;
  public description: AbstractControl;


  constructor(public fb:FormBuilder,public gu:GeneralHttpService) {

    this.form=fb.group({

      'vehical': ['', Validators.compose([Validators.required])],
      'amountPaid': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'nextDueDate':[''],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])]


    });

    this.vehical = this.form.controls['vehical'];
    this.amountPaid = this.form.controls['amountPaid'];
    this.nextDueDate=this.form.controls['nextDueDate'];
    this.description = this.form.controls["description"];
   }
   ngOnInit() {
  }
   onSubmit(m) {
    console.log(m);

  }

 

}
