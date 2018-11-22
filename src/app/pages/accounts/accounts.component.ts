import { AmountValidator } from "./../../../assets/validators/amount.valdator";
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, FormsModule } from "@angular/forms";
import { Http } from "@angular/http";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TransactionModel } from "./../../Models/Transaction.model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { GeneralHttpService } from "../../services/general-http.service";
import { AccountModel } from "../../Models/account.model";
import { BsModalService } from "ngx-bootstrap";
import { Router } from "@angular/router";
import { IMyDrpOptions } from "mydaterangepicker";
import * as moment from 'moment';
import { IMyDpOptions } from "mydatepicker";

export class searchModel {
  name: number;
  cnic: number;
  mobile: number;
}

export class EDForm {
  name: string; 
  mobileNumber: number;
  avatar:string;
}

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html"
})
export class AccountsComponent implements OnInit {
  public EDModel:EDForm;
  model2: any = {};
  fromData = new FormData();

  @ViewChild('f') form2:any;

  loading = false;
  searchHistory
  historyLoading = false;
  page: number = 1
  public search: searchModel = {
    name: 0,
    cnic: 0,
    mobile: 0
  };
  public todaydate;

  filter = "";

  showSearch = true;
  allAccounts: AccountModel[] = [];
  selectedAccountTransactions: TransactionModel[] = [];
  singleUser: any;
  public ip;
  public port;

  public editUserForm: FormGroup;

  // number = new FormControl("");
  name : AbstractControl;//new FormControl("");
  mobileNumber : AbstractControl;//new FormControl("");
  // cnic = new FormControl("");
  // address = new FormControl("");

  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;
  message: string = "";
  showSearchResult: boolean = false;
  totalIncome: number = 0;
  totalExpense: number = 0;
  craditAccouts: any[] = [];
  debitAccounts: any[] = [];
  selectedUser: any = {};
  date

  constructor(

    public fb: FormBuilder,
    public gu: GeneralHttpService,
    public modalService: BsModalService,

  ) {
    this.date = new Date();
    this.loading = true;
    this.ip = this.gu.ip;
    this.port = this.gu.port;

    this.form = fb.group({
      userAccount: ["", Validators.compose([Validators.required])],
      incomeAmount: [
        "",
        Validators.compose([
          Validators.required,
          AmountValidator.validate
        ])
      ],
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });

    this.userAccount = this.form.controls["userAccount"];
    this.incomeAmount = this.form.controls["incomeAmount"];
    this.description = this.form.controls["description"];

    this.editUserForm = fb.group({
      name: ['', Validators.compose([Validators.required])],
      mobileNumber: ['', Validators.compose([Validators.required])],
      // avatar: null
    });

    this.name = this.form.controls["name"];
    this.mobileNumber = this.form.controls["mobileNumber"];
  }


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false,
    editableDateField: false,
    // disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }

  };
  // Initialized to specific date (09.10.2018).
  public model = { year: 2018, month: 11, day: 10 };



  setEditUser(user) {
    this.fromData=new FormData();
    this.selectedUser = user;
    // console.log(this.selectedUser)

    this.gu.getAccountById(user.Id).subscribe(data => {
      this.selectedUser = data.ResponseData;
      console.log(this.selectedUser);
      this.model2.name=this.selectedUser.Name
      this.model2.mobileNumber=this.selectedUser.MobileNumber
      this.model2.avatar=this.selectedUser.Image;

      // this.editUserForm = this.fb.group({

      //   name: new FormControl(this.selectedUser.Name),
      //   mobileNumber: [this.selectedUser.MobileNumber],
      //   avatar: [this.selectedUser.Image]
      // });


    }, error => {

    });

  }

  modalRefExpense: BsModalRef;
  modalRefIncome: BsModalRef;
  setAlertOff() {
    this.search.mobile = 0;
    this.search.cnic = 0;
    this.search.name = 0;
  }

  showSearchResultToggle() {
    this.getAllAccounts();

    this.showSearchResult = !this.showSearchResult;
  }

  searchUser(word) {
    // console.log(word);

    this.showSearchResult = true;
    let accounts: any[] = [];

    this.allAccounts.forEach(e => {
      // console.log(e)

      if (e.Id == word) {
        // console.log("this is searched");
        console.log(e);
        accounts.push(e);
      }
    });

    this.allAccounts = accounts;
  }

  makeImageUrl(url) {
    console.log(url);
    return "http://{{ip}}:{{port}}/" + url;
  }
  openModalExpense(template: TemplateRef<any>) {
    this.modalRefExpense = this.modalService.show(template);
  }
  openModalIncome(templateIncome: TemplateRef<any>) {
    this.modalRefIncome = this.modalService.show(templateIncome);
  }
  ngOnInit() {
    this.loading = true;
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.allAccounts = [];
    this.craditAccouts = [];
    this.debitAccounts = [];
    this.totalIncome = 0;
    this.totalExpense = 0;
    this.loading = true;

    console.log("acounts called")
    this.gu.getAllAccounts().subscribe(
      data => {
        this.allAccounts = data.ResponseData;
        this.loading = false;
        console.log(this.allAccounts);
        this.allAccounts.forEach(element => {
          if (element.Balance > 0) {
            this.totalIncome += element.Balance;
            this.craditAccouts.push(element)


          }
          else if (element.Balance < 0) {
            this.totalExpense += element.Balance;
            this.debitAccounts.push(element);
          }
        });

        console.log("debit account", this.debitAccounts)
        console.log("radit account", this.craditAccouts)

      },
      err => {
        if (err.status == 0) {
          this.loading = false;
          this.message = "Unable to connect to the backend server";
        }
      }
    );
  }

  getTransactionsByAccountId(id) {
    this.gu.getTransactionsIdBy(id).subscribe(
      data => {
        this.selectedAccountTransactions = data.ResponseData;

        localStorage.setItem("selectedAccountTransactions", JSON.stringify(data.ResponseData));

        console.log(this.selectedAccountTransactions);
        this.gu.getAccountById(id).subscribe(
          data => {
            console.log(data);
            localStorage.setItem("singleUser", JSON.stringify(data.ResponseData));

            this.singleUser = data.ResponseData;

          },
          error => { }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  getRowTotalUsingIndex(index: number): number {
    let sum = 0;
    for (var i = 0; i <= index; i++) {
      sum += this.selectedAccountTransactions[i].Amount;
    }
    return sum;
  }

  openInNewTab() {
    var url = "/printHistory"
    var win = window.open(url, '_blank');
    win.focus();
  }

  onSubmit(form: searchModel) {
    console.log(form);

    if (form.name == 0 && form.cnic == 0 && form.mobile == 0) {
      this.message =
        "Please select any one of given filters below." +
        "     " +
        "برائے مہربانی سرچ کے لیا کوئی ایک فلٹر کا انتخاب کریں";
      console.log("empty form");
    } else if (
      (form.name !== 0 && form.cnic !== 0) ||
      (form.name !== 0 && form.mobile !== 0) ||
      (form.mobile !== 0 && form.cnic !== 0)
    ) {
      this.message =
        "Please select any one of given filters below." +
        "     " +
        "برائے مہربانی سرچ کے لیا کوئی ایک فلٹر کا انتخاب کریں";
    }

    if (form.name !== 0) {
      this.searchUser(form.name);
    } else if (form.cnic !== 0) {
      this.searchUser(form.cnic);
    } else if (form.mobile !== 0) {
      this.searchUser(form.mobile);
    }

    setTimeout(() => {
      this.search.mobile = 0;
      this.search.cnic = 0;
      this.search.name = 0;
    }, 5000);
  }

  submitEditform(post) {
    debugger
    // var post=this.form2
      // console.log(post);
    let model: any = {} //new AccountModel();

 
      // model.Number = this.selectedUser.Number;
      // model.CNIC = this.selectedUser.CNIC;
      // model.Address = this.selectedUser.Address;
      // model.Avatar=this.selectedUser.Image;
      model.Name = post.name;
      model.MobileNumber = post.mobileNumber;
    


    console.log(model)
    this.fromData.append('model', JSON.stringify(model));
    // fromData.append('avatar', this.editUserForm.get('avatar').value);


    this.gu.putAccount(this.fromData, this.selectedUser.Id).subscribe(
      data => {

        console.log('data', data)
        if (data.IsSuccess == true) {
          this.message = "record is updated successfully";
          this.allAccounts = [];
          this.getAllAccounts();
          // this.EDModel.name='';
          // this.EDModel.mobileNumber=0;
          // this.EDModel.avatar=''
          this.form2.reset();
          this.model2={}
          // this.router.navigate(["/dashboard/accounts"]);
        } else {
          this.message = data.Message;

        }
      },
      error => {
        console.log('error', error)
        this.message = error;

      });

  }

  getTransactionbyDate(d) {
    this.allAccounts = [];
    this.craditAccouts = [];
    this.debitAccounts = [];
    this.totalIncome = 0;
    this.totalExpense = 0;
    this.loading = true;

    var dd = moment(d.date.month + "-" + d.date.day + "-" + d.date.year).format("MM/DD/YYYY");
    console.log(dd)



    this.gu.getAccounts(dd).subscribe(data => {
      console.log(data)
      this.allAccounts = data.ResponseData;
      this.loading = false;
      console.log(this.allAccounts);
      this.allAccounts.forEach(element => {
        if (element.Balance > 0) {
          this.totalIncome += element.Balance;
          this.craditAccouts.push(element)


        }
        else if (element.Balance < 0) {
          this.totalExpense += element.Balance;
          this.debitAccounts.push(element);
        }
      });
    }, error => { });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      // this.editUserForm.get('avatar').setValue(file);
      this.fromData.append('avatar', file, file.name);
    }
  }

}
