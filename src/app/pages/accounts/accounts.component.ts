import { AmountValidator } from "./../../../assets/validators/amount.valdator";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
  FormControl,
  FormsModule


} from "@angular/forms";
import { Http } from "@angular/http";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TransactionModel } from "./../../Models/Transaction.model";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { GeneralHttpService } from "../../services/general-http.service";
import { AccountModel } from "../../Models/account.model";
import { BsModalService } from "ngx-bootstrap";
import { Router } from "@angular/router";

export class searchModel {
  name: number;
  cnic: number;
  mobile: number;
}

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html"
})
export class AccountsComponent implements OnInit {
  loading = false;
  historyLoading=false;
  page: number = 1
  public search: searchModel = {
    name: 0,
    cnic: 0,
    mobile: 0
  };

  filter = "";

  showSearch = true;
  allAccounts: AccountModel[] = [];
  selectedAccountTransactions: TransactionModel[] = [];
  singleUser: any;
  public ip;
  public port;

  editUserForm: FormGroup;

  number = new FormControl("", [Validators.required]);
  name = new FormControl("", [Validators.required]);
  mobileNumber = new FormControl("", [Validators.required]);
  cnic = new FormControl("", [Validators.required]);
  address = new FormControl("", [Validators.required]);

  public form: FormGroup;
  public userAccount: AbstractControl;
  public incomeAmount: AbstractControl;
  public description: AbstractControl;
  message: string = "";
  showSearchResult: boolean = false;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private gu: GeneralHttpService,
    private modalService: BsModalService,
    private http: Http
  ) {
    this.loading = true;
    this.ip = this.gu.ip;
    this.port = this.gu.port;

    this.form = fb.group({
      userAccount: ["", Validators.compose([Validators.required])],
      incomeAmount: [
        "",
        Validators.compose([
          Validators.required,
          AmountValidator.validate,
          Validators.minLength(3)
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
      number: this.number,
      name: this.name,
      mobileNumber: this.mobileNumber,
      cnic: this.cnic,
      address: this.address,
      avatar: null
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
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.gu.getAllAccounts().subscribe(
      data => {
        this.allAccounts = data.ResponseData;
        this.loading = false;
        // console.log(this.allAccounts);
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
        
        sessionStorage.setItem("selectedAccountTransactions", JSON.stringify(data.ResponseData));

        console.log(this.selectedAccountTransactions);
        this.gu.getAccountById(id).subscribe(
          data => {
            console.log(data);
            sessionStorage.setItem("singleUser", JSON.stringify(data.ResponseData));

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
    var url="/printHistory"
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
}
