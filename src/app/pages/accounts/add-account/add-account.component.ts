import { RequestOptions, Http, Headers } from '@angular/http';
import { Component, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmountValidator } from './../../../../assets/validators/amount.valdator';
import { GeneralHttpService } from '../../../services/general-http.service';
import { AccountModel } from '../../../Models/account.model';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent {
  form: FormGroup;

  number = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  mobileNumber = new FormControl('', [Validators.required]);
  cnic = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
    

  modalRef: BsModalRef;
  message: string = '';
  @ViewChild('alertModel')
  private alertModal: TemplateRef<any>;

  @ViewChild('fileInput') fileInput: ElementRef;



  constructor(public fb: FormBuilder, public router: Router, private gu: GeneralHttpService, private http: Http, private modalService: BsModalService) {
    this.form = fb.group({
      number: this.number,
      name: this.name,
      mobileNumber: this.mobileNumber,
      cnic: this.cnic,
      address: this.address,
      avatar:null
    });
  }


  onSubmit(post) {
    let fromData = new FormData();

    let model = new AccountModel();
    model.Number = post.number;
    model.Name = post.name;
    model.MobileNumber = post.mobileNumber;
    model.CNIC = post.cnic;
    model.Address = post.address;

    
    fromData.append('model',JSON.stringify(model)  );
    fromData.append('avatar', this.form.get('avatar').value);

    this.gu.postAccount(fromData).subscribe(
      data => {
        if (data.IsSuccess == true) {
          this.router.navigate(["accounts"]);
        } else {
          this.message = data.Message;
          this.openModal(this.alertModal);
        }
      },
      error => {
        this.message = error;
        this.openModal(this.alertModal);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

}
