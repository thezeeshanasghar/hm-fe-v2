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
  changeClass=false;

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
      saleDate: [''],
      computerizedNoPlate:[false],
      purchasePrice: ['', Validators.compose([AmountValidator.validate])],
      noOfPapers: ['', Validators.compose([AmountValidator.validate])],
      salePrice: ['', Validators.compose([AmountValidator.validate])],
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
    let formDate=new FormData();


    let modal=new Car();
    modal.carOwner[0]=post.owner1;
    if(post.owner2){
      modal.carOwner[1]=post.owner2
    }
    modal.Name=post.name;
    modal.EngineNumber=post.engineNumber;
    modal.ChasisNumber=post.cheasisNumber;
    modal.RegistrationNumber=post.registrationNumber;
    modal.ModelNumber=post.modalNumber;
    modal.Maker=post.maker;
    


     console.log(JSON.stringify(modal));

    
  }

  sortAllAccounts(accouts) {
    return accouts.sort((obj1, obj2) => {
      if (obj1.Number == obj2.Number) return 0;
      return (obj1.Number > obj2.Number) ? 1 : -1;
    });
  }
}
