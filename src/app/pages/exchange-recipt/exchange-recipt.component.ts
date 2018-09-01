import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GeneralHttpService } from '../../services/general-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange-recipt',
  templateUrl: './exchange-recipt.component.html'
})
export class ExchangeReciptComponent implements OnInit {

  constructor(public router: Router) {
  }
  ngOnInit() {
  }


}
