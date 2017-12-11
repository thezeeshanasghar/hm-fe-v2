import { RequestOptions, Http,Headers } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmountValidator } from './../../../../assets/validators/amount.valdator';
import { GeneralHttpService } from '../../../services/general-http.service';
import { AccountModel } from '../../../Models/account.model';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';




@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent {
  public isUploadBtn: boolean = true;
  
  changeClass = false;
  public form: FormGroup;

  public number: AbstractControl;
  public name: AbstractControl;
  public mobileNumber: AbstractControl;
  public cnic: AbstractControl;
  public address: AbstractControl;
  public amount: AbstractControl;
  public UserImageName:File;
  public ImageName:File
 // @ViewChild('ImageName') Image_Name;


  constructor(public fb: FormBuilder, public router: Router, private gu: GeneralHttpService,private http:Http) {
    this.form = fb.group({
      'number': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])],
      'mobileNumber': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(3), Validators.maxLength(11)])],
      'cnic': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(1), Validators.maxLength(13)])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'amount': ['0', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(1)])],
      
     
      
    });

    this.number = this.form.controls['number'];
    this.name = this.form.controls['name'];
    this.mobileNumber = this.form.controls['mobileNumber'];
    this.cnic = this.form.controls['cnic'];
    this.address = this.form.controls['address'];
    this.amount = this.form.controls['amount'];
  }


  onSubmit(m) {
   console.log(m)

    let model = new AccountModel();
    model.Id = 0;
    model.Number = this.form.value.number;
    model.Name = this.form.value.name;
    model.MobileNumber = this.form.value.mobileNumber;
    model.CNIC = this.form.value.cnic;
    model.Created = moment.utc(new Date()).format("DD-MM-YYYY");
    model.Address = this.form.value.address;
    model.Balance = this.form.value.amount;
    model.Image=this.ImageName;
    
    console.log(model)

    this.gu.postAccount(model).subscribe(data => {
      if(data.IsSuccess==true){
        this.router.navigate(["accounts"]);
        
      } else {
        console.log('Error in postAccount: ' + data.Message);
      }

    }, error => { console.log(error) });

   //this.router.navigate(["roznamcha"]);

  }

//file upload event  
fileChange(event) {  
  debugger;  
  let fileList: FileList = event.target.files;  
  if (fileList.length > 0) {  
  let file: File = fileList[0];  
  let formData: FormData = new FormData();  
  formData.append('uploadFile', file, file.name);  
  let headers = new Headers()  
headers.append('Content-Type', 'multipart/form-data');  
  headers.append('Accept', 'application/json');  
  let options = new RequestOptions({headers:headers});  
  let apiUrl1 = "http://"+this.gu.ip+":"+this.gu.port+"/api/UploadFileApi";  
  console.log(apiUrl1);
  this.http.post(apiUrl1, formData, options)  
  .map(res => res.json())  
  .catch(error => Observable.throw(error))  
  .subscribe(  
  data => {console.log('success')},  
  error =>{console.log(error)}  
  )  
  }  
  //window.location.reload();  
  } 

}
