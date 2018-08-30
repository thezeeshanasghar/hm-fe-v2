import { CarService } from './../../services/car/car.service';
import { Car } from './../../Models/car.model';
import { GeneralHttpService } from './../../services/general-http.service';
import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../../Models/account.model';
import { CarOwner } from '../../Models/carOwner.model';

@Component({
  selector: 'app-stock-car',
  templateUrl: './stock-car.component.html'

})
export class StockCarComponent implements OnInit {
  carOwnerList = [];
  carsList: any = [];
  changeClass = false;
  showAddCarForm = false;
  public carStockForm: FormGroup;
  carOwnerDtos: any;
  myMessage = "";
  selectedCarOwner: any = [];
  filter = '';
  loading = false;


  successTrigger = false;
  errorTrigger = false;

  allAccounts: AccountModel[] = [];
  makerList = ['Toyota', 'Honda', 'Hundai', 'Suzuki', 'Faw'];

  constructor(private cs: CarService, private fb: FormBuilder, private gu: GeneralHttpService) {
    this.loading = true;
  }

  setAlertOff() {
    this.errorTrigger = false;
    this.successTrigger = false;
  }


  ngOnInit() {
    this.getAllAccount();
    this.createForm();
    this.getCars();
  }

  createForm() {
    let date = new Date();
    this.carStockForm = this.fb.group({
      name: ['Toyata GLI', Validators.required],
      receiptNumber: ['', Validators.required],
      modelNumber: ['M321', Validators.compose([Validators.required, Validators.minLength(2)])],
      color: ['Black', Validators.compose([Validators.required, Validators.minLength(2)])],
      maker: ['Honda', Validators.compose([Validators.required, Validators.minLength(2)])],
      registrationNumber: ['R321', Validators.compose([Validators.required, Validators.minLength(2)])],
      engineNumber: ['E321', Validators.compose([Validators.required, Validators.minLength(2)])],
      chasisNumber: ['C321', Validators.compose([Validators.required, Validators.minLength(2)])],
      owner1: ['', Validators.required],
      owner2: [''],
      purchaseDate: [date, Validators.required],
      purchasePrice: ['200', Validators.compose([Validators.required, AmountValidator.validate])],
      computerizedNoPlate: [false],
      noOfPapers: ['3', Validators.compose([AmountValidator.validate])],
      token: ['Lifetime', Validators.required],
      avatar: null
    });
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = this.sortAllAccounts(data.ResponseData);
    }, error => { console.log(error) });
  }

  onSubmit(post) {
    console.log(post);
    let formData = new FormData();

    let carmodel = new Car();
    carmodel.Name = post.name;
    carmodel.receiptNumber = post.receiptNumber;
    carmodel.EngineNumber = post.engineNumber;
    carmodel.ChasisNumber = post.chasisNumber;
    carmodel.RegistrationNumber = post.registrationNumber;
    carmodel.ModelNumber = post.modelNumber;
    carmodel.Maker = post.maker;
    carmodel.Color = post.color;
    carmodel.ComputerizedNoPlate = post.computerizedNoPlate;
    carmodel.NoOfPapers = post.noOfPapers;
    carmodel.Token = post.token;
    carmodel.PurchaseDate = post.purchaseDate;
    carmodel.PurchasePrice = post.purchasePrice;



    if (post.owner2 === "") {
      this.carOwnerDtos = [{
        Id: post.owner1
      }]
    }

    else {
      this.carOwnerDtos = [
        {
          Id: post.owner1
        },
        {
          Id: post.owner2
        }
      ]

    }



    let model: any = {
      Owners: this.carOwnerDtos,
      Name: carmodel.Name,
      EngineNumber: carmodel.EngineNumber,
      ModelNumber: carmodel.ModelNumber,
      ChasisNumber: carmodel.ChasisNumber,
      RegistrationNumber: carmodel.RegistrationNumber,
      Color: carmodel.Color,
      Maker: carmodel.Maker,
      Token: carmodel.Token,
      ComputerizedNoPlate: carmodel.ComputerizedNoPlate,
      NoOfPapers: carmodel.NoOfPapers,
      PurchasePrice: carmodel.PurchasePrice,
      PurchaseDate: carmodel.PurchaseDate,
      ReceiptNumber: carmodel.receiptNumber

    }

    // formData.append('model', JSON.stringify(model));
    // formData.append('avatar', this.carStockForm.get('avatar').value);

    // console.log(formData.get('model'));
    let jsonModel = JSON.stringify(model);

    console.log("jso modal", jsonModel)

    this.cs.addCar(jsonModel).subscribe(data => {

      this.successTrigger = true;
      this.myMessage = "car added successfully. کار کا یندراج کامیاب رھا۔";
      window.scrollTo(0, 0);

      console.log(data);
    }, error => {
      console.log(error)
      this.errorTrigger = true;
      this.myMessage = "somthing went wrong Please try again" + error;
      window.scrollTo(0, 0);

    });
  }

  getCars() {

    this.cs.getCars().subscribe(data => {
      // debugger;
      // console.log(data);
      this.loading = false;
      this.carsList = data
      // this.carOwnerList=data.carOwnerDTOs
    },
      error => {
        console.log(error)

      });
  }

  sortAllAccounts(accouts) {
    return accouts.sort((obj1, obj2) => {
      if (obj1.Number == obj2.Number) return 0;
      return (obj1.Number > obj2.Number) ? 1 : -1;
    });
  }

  setUserInfo(accounts) {
    this.selectedCarOwner = accounts
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.carStockForm.get('avatar').setValue(file);
    }
  }

  showAddCarFormToggle() {
    this.showAddCarForm = !this.showAddCarForm;
  }
}
