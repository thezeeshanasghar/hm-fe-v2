import { GeneralHttpService } from './../../services/general-http.service';
import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-car',
  templateUrl: './stock-car.component.html'
  
})
export class StockCarComponent implements OnInit {

public form:FormGroup;
public name:AbstractControl;
public modelNumber:AbstractControl;
public maker:AbstractControl;
public registrationNumber:AbstractControl;
public engineNumber:AbstractControl;
public chassisNumber:AbstractControl;
public owner:AbstractControl;
public purchasePrice:AbstractControl;
public salePrice:AbstractControl;
public purchaseDate:AbstractControl;
public saleDate:AbstractControl; 
public color:AbstractControl;

allAccounts:any[]=[];
makerList =['Toyota','Honda','Hundai','Suzuki','Faw'];

  constructor(private fb:FormBuilder,private gu:GeneralHttpService) { 

    this.form=fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'modelNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'color': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'maker': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'registrationNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'engineNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'chassisNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'owner': ['', Validators.compose([Validators.required])],
      'purchasePrice': ['', Validators.compose([AmountValidator.validate])],
      'salePrice': ['', Validators.compose([AmountValidator.validate])],
      

    });

    this.name=this.form.controls['name'];
    this.modelNumber=this.form.controls['modelNumber'];
    this.maker=this.form.controls['maker'];
    this.registrationNumber=this.form.controls['registrationNumber'];
    this.engineNumber=this.form.controls['engineNumber'];
    this.chassisNumber=this.form.controls['chassisNumber'];
    this.owner=this.form.controls['owner'];
    this.purchasePrice=this.form.controls['purchasePrice'];
    this.salePrice=this.form.controls['salePrice'];
    this.color=this.form.controls['color'];

  }

  ngOnInit() {
    this.getAllAccount();
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data=> { 
      this.allAccounts=data.ResponseData; 
      console.log(this.allAccounts)   
    }, error=> {});
  }

  onSubmit(m){
    console.log(m);

  }
}
