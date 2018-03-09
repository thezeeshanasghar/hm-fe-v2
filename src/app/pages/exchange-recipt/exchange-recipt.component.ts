import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GeneralHttpService } from '../../services/general-http.service';

@Component({
  selector: 'app-exchange-recipt',
  templateUrl: './exchange-recipt.component.html'
})
export class ExchangeReciptComponent implements OnInit {
  showSeller: boolean=false;
  showBuyer: boolean=false;
  allAccounts: any[] = [];
  public form: FormGroup;
  public buyer1: AbstractControl;
  public seller1: AbstractControl;
  public buyer2: AbstractControl;
  public seller2: AbstractControl;
  public buyerName: AbstractControl;
  public buyerContact: AbstractControl;
  public buyerCNIC: AbstractControl;
  public buyerAddress: AbstractControl;

  public buyersVehical: AbstractControl;
  public buyersVehicalName: AbstractControl;
  public buyersVehicalModelNumber: AbstractControl;
  public buyersVehicalMaker: AbstractControl;
  public buyersVehicalRegistrationNumber: AbstractControl;
  public buyersVehicalEngineNumber: AbstractControl;
  public buyersVehicalChassisNumber: AbstractControl;
  public buyersVehicalColor: AbstractControl;
  public description: AbstractControl;

  public sellerName: AbstractControl;
  public sellerContact: AbstractControl;
  public sellerCNIC: AbstractControl;
  public sellerAddress: AbstractControl;
  public sellerVehical: AbstractControl;
  public sellerVehicalName: AbstractControl;
  public sellerVehicalModelNumber: AbstractControl;
  public sellerVehicalMaker: AbstractControl;
  public sellerVehicalRegistrationNumber: AbstractControl;
  public sellerVehicalEngineNumber: AbstractControl;
  public sellerVehicalChassisNumber: AbstractControl;
  public sellerVehicalColor: AbstractControl;
 
 

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
      'buyersVehicalvehical': ['', Validators.compose([Validators.required])],
      'buyersVehicalvehicalName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyersVehicalmodelNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyersVehicalColor': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyersVehicalMaker': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyersVehicalRegistrationNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyersVehicalEngineNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyersVehicalChassisNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

      'sellerName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerContact': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'sellerCNIC': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
      'sellerAddress': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalvehical': ['', Validators.compose([Validators.required])],
      'sellerVehicalvehicalName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalmodelNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalColor': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalMaker': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalRegistrationNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalEngineNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerVehicalChassisNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

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

    this.buyersVehical= this.form.controls['buyersVehical'];
    this.buyersVehicalName = this.form.controls['buyersVehicalName'];
    this.buyersVehicalModelNumber = this.form.controls['buyersVehicalModelNumber'];
    this.buyersVehicalMaker = this.form.controls['buyersVehicalMaker'];
    this.buyersVehicalRegistrationNumber = this.form.controls['buyersVehicalRegistrationNumber'];
    this.buyersVehicalEngineNumber = this.form.controls['buyersVehicalEngineNumber'];
    this.buyersVehicalChassisNumber = this.form.controls['buyersVehicalChassisNumber'];
    this.buyersVehicalColor = this.form.controls['buyersVehicalColor'];

    this.sellerName = this.form.controls['sellerName'];
    this.sellerContact = this.form.controls['sellerContact'];
    this.sellerCNIC = this.form.controls['sellerCNIC'];
    this.sellerAddress = this.form.controls['sellerAddress'];

    this.sellerVehical= this.form.controls['sellerVehical'];
    this.sellerVehicalName = this.form.controls['sellerVehicalName'];
    this.sellerVehicalModelNumber = this.form.controls['sellerVehicalModelNumber'];
    this.sellerVehicalMaker = this.form.controls['sellerVehicalMaker'];
    this.sellerVehicalRegistrationNumber = this.form.controls['sellerVehicalRegistrationNumber'];
    this.sellerVehicalEngineNumber = this.form.controls['sellerVehicalEngineNumber'];
    this.sellerVehicalChassisNumber = this.form.controls['sellerVehicalChassisNumber'];
    this.sellerVehicalColor = this.form.controls['sellerVehicalColor'];

     
    this.description = this.form.controls["description"];
    this.dueDate = this.form.controls['dueDate'];
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
