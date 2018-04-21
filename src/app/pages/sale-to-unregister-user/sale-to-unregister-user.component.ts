import { GeneralHttpService } from './../../services/general-http.service';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-to-unregister-user',
  templateUrl: './sale-to-unregister-user.component.html'
})
export class SaleToUnregisterUserComponent implements OnInit {
  allAccounts: any[] = [];
  changeClass=false;

  showBuyer = false;
  showSeller = false;
  vehicalList = ['LHR 1234', 'LHQ 3456', 'LHE 5463', 'LHR 4567', 'LHE 6789', 'LHQ 2345']

  public form: FormGroup;
  public buyer1: AbstractControl;
  public seller1: AbstractControl;
  public buyer2: AbstractControl;
  public seller2: AbstractControl;
  public buyerName: AbstractControl;
  public buyerContact: AbstractControl;
  public buyerCNIC: AbstractControl;
  public buyerAddress: AbstractControl;
  public description: AbstractControl;

  public sellerName: AbstractControl;
  public sellerContact: AbstractControl;
  public sellerCNIC: AbstractControl;
  public sellerAddress: AbstractControl;
  public vehical: AbstractControl;
  public vehicalName: AbstractControl;
  public modelNumber: AbstractControl;
  public maker: AbstractControl;
  public registrationNumber: AbstractControl;
  public engineNumber: AbstractControl;
  public chassisNumber: AbstractControl;
  public color: AbstractControl;

  public dueDate: AbstractControl;
  public commissionFromSeller: AbstractControl;
  public commissionFromBuyer: AbstractControl;

  public vehicalPrice: AbstractControl;
  public buyerPaidAmount: AbstractControl;

  public witnessName1: AbstractControl;
  public witnessContact1: AbstractControl;
  public witnessCnic1: AbstractControl;

  public witnessName2: AbstractControl;
  public witnessContact2: AbstractControl;
  public witnessCnic2: AbstractControl;


  makerList = ['Toyota', 'Honda', 'Hundai', 'Suzuki', 'Faw'];


  constructor(private fb: FormBuilder, private gu: GeneralHttpService) {

    this.form = fb.group({
      'buyer1': ['', Validators.compose([Validators.required])],
      'buyer2': ['', Validators.compose([Validators.required])],
      'seller1': ['', Validators.compose([Validators.required])],
      'seller2': ['', Validators.compose([Validators.required])],
      'buyerName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyerContact': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'buyerCNIC': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
      'buyerAddress': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

      'sellerName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerContact': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'sellerCNIC': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
      'sellerAddress': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'vehical': ['', Validators.compose([Validators.required])],

      'vehicalName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'modelNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'color': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'maker': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'registrationNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'engineNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'chassisNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])],


      'dueDate': [''],
      'commissionFromSeller': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'commissionFromBuyer': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'vehicalPrice': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyerPaidAmount': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

      'witnessName1': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'witnessContact1': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic1': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
      'witnessName2': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'witnessContact2': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic2': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
    });

    this.buyer1 = this.form.controls['buyer1'];
    this.buyer2 = this.form.controls['buyer2'];
    this.seller1 = this.form.controls['seller1'];
    this.seller2 = this.form.controls['seller2'];
    this.buyerName = this.form.controls['buyerName'];
    this.buyerContact = this.form.controls['buyerContact'];
    this.buyerCNIC = this.form.controls['buyerCNIC'];
    this.buyerAddress = this.form.controls['buyerAddress'];

    this.sellerName = this.form.controls['sellerName'];
    this.sellerContact = this.form.controls['sellerContact'];
    this.sellerCNIC = this.form.controls['sellerCNIC'];
    this.sellerAddress = this.form.controls['sellerAddress'];
    this.description = this.form.controls["description"];


    this.dueDate = this.form.controls['dueDate'];
    this.vehical = this.form.controls['vehical'];
    this.vehicalName = this.form.controls['vehicalName'];
    this.modelNumber = this.form.controls['modelNumber'];
    this.maker = this.form.controls['maker'];
    this.registrationNumber = this.form.controls['registrationNumber'];
    this.engineNumber = this.form.controls['engineNumber'];
    this.chassisNumber = this.form.controls['chassisNumber'];
    this.color = this.form.controls['color'];

    this.vehicalPrice = this.form.controls['vehicalPrice'];
    this.buyerPaidAmount = this.form.controls['buyerPaidAmount'];
    this.commissionFromSeller = this.form.controls['commissionFromSeller'];
    this.commissionFromBuyer = this.form.controls['commissionFromBuyer'];

    this.witnessName1 = this.form.controls['witnessName1'];
    this.witnessContact1 = this.form.controls['witnessContact1'];
    this.witnessCnic1 = this.form.controls['witnessCnic1'];

    this.witnessName2 = this.form.controls['witnessName2'];
    this.witnessContact2 = this.form.controls['witnessContact2'];
    this.witnessCnic2 = this.form.controls['witnessCnic2'];

  }

  ngOnInit() {
    this.getAllAccount();
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
      console.log(this.allAccounts)
    }, error => { });
  }

  changeCheckboxBuyer(c) {
    // console.log("checkbox ");
    this.showBuyer = !this.showBuyer;
    console.log(this.showBuyer)
  }
  changeCheckboxSeller(c) {

    this.showSeller = !this.showSeller;

  }

  onSubmit(m) {
    console.log(m);

  }

}
