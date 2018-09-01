import { CarService } from './../../services/car/car.service';
import { Car } from './../../Models/car.model';
import { GeneralHttpService } from './../../services/general-http.service';
import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../../Models/account.model';
import { CarOwner } from '../../Models/carOwner.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-car',
  templateUrl: './stock-car.component.html'

})
export class StockCarComponent implements OnInit {
  // carOwnerList = [];
  // carsList: any = [];
  // changeClass = false;
  // showAddCarForm = false;
  // public carStockForm: FormGroup;
  // carOwnerDtos: any;
  // myMessage = "";
  // selectedCarOwner: any = [];
  // filter = '';
  // loading = false;


  // successTrigger = false;
  // errorTrigger = false;

  // allAccounts: AccountModel[] = [];
  // makerList = ['Toyota', 'Honda', 'Hundai', 'Suzuki', 'Faw'];

  constructor(
    public router: Router
    // private cs: CarService,
    //  private fb: FormBuilder, 
    //  private gu: GeneralHttpService
  ) {
    // this.loading = true;
  }

  // setAlertOff() {
  //   this.errorTrigger = false;
  //   this.successTrigger = false;
  // }


  ngOnInit() {
    // this.getAllAccount();
    // this.createForm();
    // this.getCars();
  }

  // createForm() {
  //   let date = new Date();
  //   this.carStockForm = this.fb.group({
  //     name: ['Toyata GLI', Validators.required],
  //     receiptNumber: ['', Validators.required],
  //     modelNumber: ['M321', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     color: ['Black', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     maker: ['Honda', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     registrationNumber: ['R321', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     engineNumber: ['E321', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     chasisNumber: ['C321', Validators.compose([Validators.required, Validators.minLength(2)])],
  //     owner1: ['', Validators.required],
  //     owner2: [''],
  //     purchaseDate: [new Date(), Validators.required],
  //     purchasePrice: ['200', Validators.compose([Validators.required, AmountValidator.validate])],
  //     computerizedNoPlate: [false],
  //     noOfPapers: ['3', Validators.compose([AmountValidator.validate])],
  //     token: ['Lifetime', Validators.required],
  //     avatar: null
  //   });
  // }

  // getAllAccount() {
  //   this.gu.getAllAccounts().subscribe(data => {
  //     this.allAccounts = this.sortAllAccounts(data.ResponseData);
  //   }, error => { console.log(error) });
  // }



  // getCars() {

  //   this.cs.getCars().subscribe(data => {
  //     // debugger;
  //     // console.log(data);
  //     this.loading = false;
  //     this.carsList = data
  //     // this.carOwnerList=data.carOwnerDTOs
  //   },
  //     error => {
  //       console.log(error)

  //     });
  // }

  // sortAllAccounts(accouts) {
  //   return accouts.sort((obj1, obj2) => {
  //     if (obj1.Number == obj2.Number) return 0;
  //     return (obj1.Number > obj2.Number) ? 1 : -1;
  //   });
  // }

}
