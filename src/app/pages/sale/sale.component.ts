import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { GeneralHttpService } from '../../services/general-http.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html'
})
export class SaleComponent implements OnInit {

  changeClass=false;
  allAccounts:any[]=[];
  vehicalList=['LHR 1234','LHQ 3456','LHE 5463','LHR 4567','LHE 6789','LHQ 2345']
  public form:FormGroup;
  public owner1:AbstractControl;
  public owner2:AbstractControl;
  public buyer1:AbstractControl;
  public buyer2:AbstractControl;
  public vehical:AbstractControl;
  public date:AbstractControl;
  public commissionFromOwner:AbstractControl;
  public commissionFromBuyer:AbstractControl;
  public vehicalPrice:AbstractControl;
  public buyerPaidAmount:AbstractControl; 
  public witnessName1:AbstractControl;
  public witnessContact1:AbstractControl;
  public witnessCnic1:AbstractControl;
  public witnessName2:AbstractControl;
  public witnessContact2:AbstractControl;
  public witnessCnic2:AbstractControl;

  constructor(public fb:FormBuilder,public gu:GeneralHttpService) {

    this.form=fb.group({
      'owner1': ['', Validators.compose([Validators.required])],
      'owner2': [''],
      'buyer1': ['', Validators.compose([Validators.required])],
      'buyer2': [''],
      'vehical': ['', Validators.compose([Validators.required])],
      'date':[''],
      'commissionFromOwner': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'commissionFromBuyer': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'vehicalPrice': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyerPaidAmount': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

      'witnessName1': ['', Validators.compose([Validators.required , Validators.minLength(2)])],
      'witnessContact1': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic1': ['', Validators.compose([Validators.required , Validators.maxLength(13)])],
      'witnessName2': ['', Validators.compose([Validators.required , Validators.minLength(2)])],
      'witnessContact2': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic2': ['', Validators.compose([Validators.required ,  Validators.maxLength(13)])],
   


      
    });

    this.owner1=this.form.controls['owner1'];
    this.owner2=this.form.controls['owner2'];

    this.buyer1=this.form.controls['buyer1'];
    this.buyer2=this.form.controls['buyer2'];

    this.date=this.form.controls['date'];
    this.vehical=this.form.controls['vehical'];
    this.vehicalPrice=this.form.controls['vehicalPrice'];
    this.buyerPaidAmount=this.form.controls['buyerPaidAmount'];
    this.commissionFromOwner=this.form.controls['commissionFromOwner'];
    this.commissionFromBuyer=this.form.controls['commissionFromBuyer'];

    this.witnessName1=this.form.controls['witnessName1'];
    this.witnessContact1=this.form.controls['witnessContact1'];
    this.witnessCnic1=this.form.controls['witnessCnic1'];

    this.witnessName2=this.form.controls['witnessName2'];
    this.witnessContact2=this.form.controls['witnessContact2'];
    this.witnessCnic2=this.form.controls['witnessCnic2'];
    




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
