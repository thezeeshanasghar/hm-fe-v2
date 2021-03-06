import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AmountValidator } from '../../../../assets/validators';
import { AccountModel } from '../../../Models/account.model';
import { CarService } from '../../../services/car/car.service';
import { GeneralHttpService } from '../../../services/general-http.service';
import { Car } from '../../../Models/car.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carOwnerList = [];
  carsList: any = [];
  seller1AccountList: any[] = []
  seller2AccountList: any[] = []
  changeClass = false;
  showAddCarForm = false;
  public carStockForm: FormGroup;
  carOwnerDtos: any;
  myMessage = "";
  // selectedCarOwner: any = [];
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


  removeAccountfromSuperListOwner1(id) {

    var dummyList: any[] = this.allAccounts.slice(0);
    for (let i = 0; i < dummyList.length; i++) {
      const e = dummyList[i];
      var index = dummyList.indexOf(e)

      if (index > -1 && e.Id == id) {
        dummyList.splice(index, 1);
        break;
      }

    }
    this.seller2AccountList = dummyList;
  }

  createForm() {
    let date = new Date();
    this.carStockForm = this.fb.group({
      name: ['', Validators.required],
      receiptNumber: ['', Validators.required],
      modelNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      color: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      maker: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      registrationNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      engineNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      chasisNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      owner1: ['', Validators.required],
      owner2: [''],
      purchaseDate: [new Date(), Validators.required],
      purchasePrice: ['', Validators.compose([Validators.required, AmountValidator.validate])],
      computerizedNoPlate: [false],
      noOfPapers: ['', Validators.compose([AmountValidator.validate])],
      token: ['', Validators.required],
      avatar: null,
      avatar2: null,
    });
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = this.sortAllAccounts(data.ResponseData);
      this.seller1AccountList = this.allAccounts.slice(0);
      this.seller2AccountList = this.allAccounts.slice(0);

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
      Accounts: this.carOwnerDtos,
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

    formData.append('model', JSON.stringify(model));
    formData.append('avatar', this.carStockForm.get('avatar').value);
    formData.append('avatar2', this.carStockForm.get('avatar2').value);

    // console.log(formData.get('model'));
    let jsonModel = JSON.stringify(model);

    console.log("form data", formData.get('model'), formData.get('avatar'));

    this.cs.addCar(formData).subscribe(data => {

      this.successTrigger = true;
      this.myMessage = "car added successfully. کار کا یندراج کامیاب رھا۔";
      window.scrollTo(0, 0);
      this.carStockForm.reset();

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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.carStockForm.get('avatar').setValue(file);
    }
  }
  onFile2Change(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.carStockForm.get('avatar2').setValue(file);
    }
  }

}
