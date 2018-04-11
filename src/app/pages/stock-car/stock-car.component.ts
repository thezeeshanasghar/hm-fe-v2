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
  changeClass = false;

  public carStockForm: FormGroup;

  allAccounts: AccountModel[] = [];
  makerList = ['Toyota', 'Honda', 'Hundai', 'Suzuki', 'Faw'];

  constructor(private fb: FormBuilder, private gu: GeneralHttpService) {
    this.createForm();
  }

  createForm() {
    this.carStockForm = this.fb.group({
      name: ['', Validators.required],
      modelNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      color: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      maker: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      registrationNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      engineNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      chasisNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      owner1: ['', Validators.required],
      owner2: [''],
      purchaseDate: [''],

      computerizedNoPlate: [false],
      purchasePrice: ['', Validators.compose([AmountValidator.validate])],
      noOfPapers: ['', Validators.compose([AmountValidator.validate])],

      token: ['', Validators.required],
      avatar: null
    });
  }

  ngOnInit() {
    this.getAllAccount();
  }

  getAllAccount() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = this.sortAllAccounts(data.ResponseData);
    }, error => { console.log(error) });
  }

  onSubmit(post) {
    console.log(post);
    let formData = new FormData();

    debugger;
    


    let carmodel = new Car();
    // carmodel.carOwner[0].AccountId = post.owner1;
    // carmodel.carOwner[1].AccountId = post.owner2;
    carmodel.Name = post.name;
    carmodel.EngineNumber = post.engineNumber;
    carmodel.ChasisNumber = post.cheasisNumber;
    carmodel.RegistrationNumber = post.registrationNumber;
    carmodel.ModelNumber = post.modelNumber;
    carmodel.Maker = post.maker;
    carmodel.Color = post.color;
    carmodel.ComputerizedNoPlate = post.computerizedNoPlate;
    carmodel.NoOfPapers = post.numberOfPapers;
    carmodel.Token = post.token;
    carmodel.PurchaseDate = post.purchaseDate;
    carmodel.PurchasePrice = post.purchasePrice;

    let model = {
      carOwnerDTO: [
        {
          AccountId: post.owner1
        },
        {
          AccountId: post.owner2
        }
      ]
      ,
      carDTO: {
        Id: 0,
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
        PurchasePrice:carmodel.PurchasePrice,
        PurchaseDate: carmodel.PurchaseDate

      }

    }


    formData.append('model', JSON.stringify(model));
    formData.append('avatar', this.carStockForm.get('avatar').value);


    console.log(formData.get('model'));


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
}
