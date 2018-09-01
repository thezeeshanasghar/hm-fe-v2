import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car/car.service';
import { Validators, FormBuilder } from '@angular/forms';
import { AmountValidator } from '../../../../assets/validators';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  loading: boolean;
  carsList: any[] = [];
  filter = '';
  selectedCarOwner: any[] = [];
  carStockForm: any;

  constructor(private cs: CarService, private fb: FormBuilder, ) { }

  ngOnInit() {
    this.getCars();
    this.createForm();
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
      purchaseDate: [new Date(), Validators.required],
      purchasePrice: ['200', Validators.compose([Validators.required, AmountValidator.validate])],
      computerizedNoPlate: [false],
      noOfPapers: ['3', Validators.compose([AmountValidator.validate])],
      token: ['Lifetime', Validators.required],
      avatar: null
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

  setUserInfo(accounts) {
    this.selectedCarOwner = accounts
  }
}
