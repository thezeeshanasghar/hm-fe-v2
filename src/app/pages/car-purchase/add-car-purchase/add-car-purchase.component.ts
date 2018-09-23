import { CarPurchaseService } from './../../../services/car/car-purchase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GeneralHttpService } from '../../../services/general-http.service';
import { AmountValidator } from '../../../../assets/validators';
import { CarPurchaseComponent } from '../car-purchase.component';
// import rxjs from rxjs

@Component({
  selector: 'app-add-car-purchase',
  templateUrl: './add-car-purchase.component.html',
  styleUrls: ['./add-car-purchase.component.css']
})
export class AddCarPurchaseComponent implements OnInit {

  allAccounts: any[] = [];
  changeClass = false;
  showSales = false;

  successMessage = '';
  errorMessage = ''

  superAccountList: any[] = []
  seller1AccountList: any[] = []
  seller2AccountList: any[] = []
  buyer1AccountList: any[] = []
  buyer2AccountList: any[] = []

  showBuyer = true;
  showSeller = true;
  vehicalList: any = []//['LHR 1234', 'LHQ 3456', 'LHE 5463', 'LHR 4567', 'LHE 6789', 'LHQ 2345']

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
  constructor(private fb: FormBuilder, private gu: GeneralHttpService, private purchaseService: CarPurchaseService) {

    this.form = this.fb.group({
      'buyer1': [0, Validators.compose([Validators.required])],
      'buyer2': [0, Validators.compose([Validators.required])],
      'seller1': [0, Validators.compose([Validators.required])],
      'seller2': [0, Validators.compose([Validators.required])],
      'buyerName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'buyerContact': [0, Validators.compose([Validators.required, Validators.maxLength(11)])],
      'buyerCNIC': [0, Validators.compose([Validators.required, Validators.maxLength(13)])],
      'buyerAddress': ['', Validators.compose([Validators.required, Validators.minLength(2)])],

      'sellerName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'sellerContact': [0, Validators.compose([Validators.required, Validators.maxLength(11)])],
      'sellerCNIC': [0, Validators.compose([Validators.required, Validators.maxLength(13)])],
      'sellerAddress': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'vehical': [0, Validators.compose([Validators.required])],

      'vehicalName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'modelNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'color': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'maker': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'registrationNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'engineNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'chassisNumber': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])],

      'dueDate': [new Date(), Validators.required],
      'dealDate': [new Date(), Validators.required],
      'commissionFromSeller': [0, Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],
      'commissionFromBuyer': [0, Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],
      'vehicalPrice': [0, Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],
      'buyerPaidAmount': [0, Validators.compose([Validators.required, Validators.minLength(2), AmountValidator.validate])],

      'witnessName1': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'witnessContact1': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic1': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],
      'witnessName2': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'witnessContact2': ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
      'witnessCnic2': ['', Validators.compose([Validators.required, Validators.maxLength(13)])],

      'computerizedNoPlate': [false],
      'noOfPapers': [0, Validators.compose([AmountValidator.validate])],
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
  setAlertOff() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  getOwnedCars(id) {
    this.purchaseService.getOwnedCarsList(id).subscribe(data => {
      console.log(data)
      this.vehicalList = data;
      if (this.vehicalList.length == 0) {
        this.errorMessage = "No Car found on this owner name";
      }
    }, error => {
      console.log(error)
    })
  }
  removeAccountfromSuperListSeller1(id) {

    var newList: any[] = [];
    var dummyList: any[] = this.allAccounts.slice(0);
    for (let i = 0; i < dummyList.length; i++) {
      const e = dummyList[i];
      var index = dummyList.indexOf(e)

      if (index > -1 && e.Id == id) {
        dummyList.splice(index, 1);
        break;
        // this.seller2AccountList.splice(index, 1);
        // this.buyer1AccountList.splice(index, 1);
        // this.buyer2AccountList.splice(index, 1);

      }

    }

    // this.seller2AccountList.splice(index, 1);
    // this.buyer1AccountList.splice(index, 1);
    // this.buyer2AccountList.splice(index, 1);

    this.seller2AccountList = dummyList;
    this.buyer1AccountList = dummyList;
    this.buyer2AccountList = dummyList;



  }
  removeAccountfromSuperListSeller2(id) {

    var newList: any[] = [];
    var dummyList: any[] = this.seller2AccountList.slice(0);
    for (let i = 0; i < dummyList.length; i++) {
      const e = dummyList[i];
      var index = dummyList.indexOf(e)

      if (index > -1 && e.Id == id) {
        dummyList.splice(index, 1);
        break;
        // this.seller2AccountList.splice(index, 1);
        // this.buyer1AccountList.splice(index, 1);
        // this.buyer2AccountList.splice(index, 1);

      }

    }

    // this.seller2AccountList.splice(index, 1);
    // this.buyer1AccountList.splice(index, 1);
    // this.buyer2AccountList.splice(index, 1);

    // this.seller1AccountList = dummyList;
    this.buyer1AccountList = dummyList;
    this.buyer2AccountList = dummyList;



  }
  removeAccountfromSuperListBuyer1(id) {

    var newList: any[] = [];
    var dummyList: any[] = this.buyer1AccountList.slice(0);
    for (let i = 0; i < dummyList.length; i++) {
      const e = dummyList[i];
      var index = dummyList.indexOf(e)

      if (index > -1 && e.Id == id) {
        dummyList.splice(index, 1);
        break;
      }
    }

    this.buyer2AccountList = dummyList;
  }
  getSharedCars(id1, id2) {

    debugger
    console.log(id1, id2)
    this.purchaseService.getSharedCarsList(id1, id2).subscribe(data => {
      console.log(data)
      this.vehicalList = data;
    }, error => {
      console.log(error)
    })
  }

  showSalesFormToggle() {
    this.showSales = !this.showSales;
  }
  getAllAccount() {

    // debugger
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
      this.superAccountList = this.allAccounts.slice(0);
      this.seller1AccountList = this.allAccounts.slice(0);
      this.seller2AccountList = this.allAccounts.slice(0);
      this.buyer1AccountList = this.allAccounts.slice(0);
      this.buyer2AccountList = this.allAccounts.slice(0);
      console.log("all accounts", this.allAccounts)
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

    var buyerList: any = [];
    var sellerList: any = [];
    if (m.buyer2 != '') {
      buyerList = [
        { id: m.buyer1 },
        { id: m.buyer2 },
      ]
    }
    else {
      buyerList = [
        { id: m.buyer1 },
      ]
    }

    if (m.seller2 != '') {
      sellerList = [
        { id: m.seller1 },
        { id: m.seller2 },
      ]
    }
    else {
      sellerList = [
        { id: m.seller1 },
      ]
    }



    // console.log(m);

    let model = {
      Buyers: buyerList
      //  [
      //   {
      //     Id: m.buyer1,
      //     // AccountId: m.buyer1,
      //     // PaidAmount: m.buyerPaidAmount,
      //     // commission: m.commissionFromBuyer
      //   },
      //   {
      //     Id: m.buyer2,
      //     // AccountId: m.buyer2,

      //   }

      // ]
      ,
      Sellers: sellerList
      // [
      //   {
      //     Id: m.seller1,
      //     // AccountId: m.seller1,
      //     // VehicalPrice: m.vehicalPrice,
      //     // commission: m.commissionFromSeller
      //   },
      //   {
      //     Id: m.seller2,
      //     // AccountId: m.seller2,

      //   }
      // ]
      ,

      Witnesses: [
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
      CarID: m.vehical,
      DealDate: m.dealDate,
      Price: m.vehicalPrice,
      BuyerCom: m.commissionFromBuyer,
      SellerCom: m.commissionFromSeller,
      Description: m.description
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

    let form = JSON.stringify(model);

    this.purchaseService.addPurchasedCar(form).subscribe(data => {

      console.log("car purchase data", data);
      this.successMessage = data.Message

    }, error => {

      console.log("car purchase error", error)
      this.errorMessage = error.Message


    })



  }

}
