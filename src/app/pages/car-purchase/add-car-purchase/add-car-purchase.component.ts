import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GeneralHttpService } from '../../../services/general-http.service';
import { AmountValidator } from '../../../../assets/validators';
import { CarPurchaseComponent } from '../car-purchase.component';

@Component({
  selector: 'app-add-car-purchase',
  templateUrl: './add-car-purchase.component.html',
  styleUrls: ['./add-car-purchase.component.css']
})
export class AddCarPurchaseComponent implements OnInit {

  allAccounts: any[] = [];
  changeClass = false;
  showSales = false;

  showBuyer = true;
  showSeller = true;
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
  public dealDate: AbstractControl;

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
  ids: any[] = [];
  constructor(private fb: FormBuilder, private gu: GeneralHttpService,private purchaseService:CarPurchaseComponent) {

    this.form = this.fb.group({
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
      'dealDate': [''],
      'commissionFromSeller': ['', Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],
      'commissionFromBuyer': ['', Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],
      'vehicalPrice': ['', Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],
      'buyerPaidAmount': ['', Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],

      'witnessName1': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'witnessContact1': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic1': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
      'witnessName2': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'witnessContact2': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic2': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],

      'computerizedNoPlate': [false],
      'noOfPapers': ['3', Validators.compose([AmountValidator.validate])],
      'token': ['Lifetime', Validators.required],
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

    this.dealDate = this.form.controls['dealDate'];
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

  getOwnedCars(id) {

    console.log("incomming id : " ,id)
    this.ids.push(id);
    console.log("ids array: " ,this.ids)
  }

  showSalesFormToggle() {
    this.showSales = !this.showSales;
  }

  getAllAccount() {

    debugger
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
      console.log("all accounts",this.allAccounts)
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

  onSubmit(m: any) {
    // console.log(m);

    let model = {
      buyers
        : [
          {
            Id: m.buyer1,
            // AccountId: m.buyer1,
            // PaidAmount: m.buyerPaidAmount,
            // commission: m.commissionFromBuyer
          },
          {
            Id: m.buyer2,
            // AccountId: m.buyer2,

          }

        ],
      sellers: [
        {
          Id: m.seller1,
          // AccountId: m.seller1,
          // VehicalPrice: m.vehicalPrice,
          // commission: m.commissionFromSeller
        },
        {
          Id: m.seller2,
          // AccountId: m.seller2,

        }
      ],

      witnesses: [
        {

          Name: m.witnessName1,
          CNIC: m.witnessCnic1,
          Contact: m.witnessContact1
        },
        {

          Name: m.witnessName2,
          CNIC: m.witnessCnic2,
          Contact: m.witnessContact2
        }
      ],
      carId: m.vehicalID,
      dealDate: m.dealDate,
      CarPrice: m.buyerPaidAmount,
      buyerCommission: m.commissionFromBuyer,
      SellerCommission: m.commissionFromSeller
      // carDTO: {
      //   carId: 0

      //   // Name: m.vehicalName,
      //   // EngineNumber: m.engineNumber,
      //   // ModelNumber: m.modelNumber,
      //   // ChasisNumber: m.chassisNumber,
      //   // RegistrationNumber: m.registrationNumber,
      //   // Color: m.color,
      //   // Maker: m.maker,
      //   // Token: m.token,
      //   // ComputerizedNoPlate: m.computerizedNoPlate,
      //   // NoOfPapers: m.noOfPApsers,

      // }


    }


    console.log(JSON.stringify(model));
  }

}
