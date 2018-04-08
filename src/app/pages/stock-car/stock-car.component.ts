import { Car } from './../../Models/car.model';
import { GeneralHttpService } from './../../services/general-http.service';
import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../../Models/account.model';

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
      chassisNumber: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      owner1: ['', Validators.required],
      owner2: [''],
      purchaseDate: [''],
   
      computerizedNoPlate: [false],
      purchasePrice: ['', Validators.compose([AmountValidator.validate])],
      noOfPapers: ['', Validators.compose([AmountValidator.validate])],
    
      token: ['', Validators.required],
      avatar:null
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
    let model = new Car();
    model.carOwner[0] = post.owner1;
    if (post.owner2) {
      model.carOwner[1] = post.owner2
    }
    model.Name = post.name;
    model.EngineNumber = post.engineNumber;
    model.ChasisNumber = post.cheasisNumber;
    model.RegistrationNumber = post.registrationNumber;
    model.ModelNumber = post.modelNumber;
    model.Maker = post.maker;
    model.Color = post.color;
    model.ComputerizedNoPlate = post.computerizedNoPlate;
    model.NoOfPapers = post.numberOfPapers;
    model.Token = post.token;
    model.PurchaseDate = post.purchaseDate;
    model.PurchasePrice = post.purchasePrice;


    formData.append('model',JSON.stringify(model) );
    formData.append('avatar', this.carStockForm.get('avatar').value);


    console.log(formData);


  }

  sortAllAccounts(accouts) {
    return accouts.sort((obj1, obj2) => {
      if (obj1.Number == obj2.Number) return 0;
      return (obj1.Number > obj2.Number) ? 1 : -1;
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.carStockForm.get('avatar').setValue(file);
    }
  }
}
