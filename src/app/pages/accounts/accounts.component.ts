import { AmountValidator } from './../../../assets/validators/amount.valdator';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { GeneralHttpService } from '../../services/general-http.service';
import { AccountModel } from '../../Models/account.model';
import { BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  allAccounts: AccountModel[] = [];
  selectedAccountTransactions: TransactionModel[] = [];
  singleUser:any;
 public ip;
  public port;

  editUserForm: FormGroup;

  number = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  mobileNumber = new FormControl('', [Validators.required]);
  cnic = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
    

  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;

  constructor(public fb: FormBuilder,private gu: GeneralHttpService, private modalService: BsModalService,private http:Http) { 
    this.ip=this.gu.ip;
    this.port=this.gu.port;

    this.form = fb.group({
      'userAccount': ['', Validators.compose([Validators.required])],
      'incomeAmount': ['', Validators.compose([Validators.required, AmountValidator.validate, Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])]

    });

    this.userAccount = this.form.controls["userAccount"];
    this.incomeAmount = this.form.controls["incomeAmount"];
    this.description = this.form.controls["description"];

    this.editUserForm = fb.group({
      number: this.number,
      name: this.name,
      mobileNumber: this.mobileNumber,
      cnic: this.cnic,
      address: this.address,
      avatar:null
    });
  }
  modalRefExpense: BsModalRef;
  modalRefIncome: BsModalRef;
 

  openModalExpense(template: TemplateRef<any>) {
    this.modalRefExpense = this.modalService.show(template);
  }
  openModalIncome(templateIncome: TemplateRef<any>) {
    this.modalRefIncome = this.modalService.show(templateIncome);
  }
  ngOnInit() {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
    }, error => { });
  }

  getTransactionsByAccountId(id) {
    this.gu.getTransactionsIdBy(id).subscribe(data => {
      this.selectedAccountTransactions = data.ResponseData;
      console.log(this.selectedAccountTransactions);
      this.gu.getAccountById(id).subscribe(data=>{
        console.log(data);
        this.singleUser=data.ResponseData;
      },error=>{});

    }, error => { console.log(error); });
  }

  
  
  getRowTotalUsingIndex(index :number):number {
    let sum = 0;
    for(var i = 0; i <= index; i++) {
      sum += this.selectedAccountTransactions[i].Amount;
    }
    return sum;
  }
}
