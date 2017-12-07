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
  ip;
  port;

  constructor(private gu: GeneralHttpService, private modalService: BsModalService,private http:Http) { 
    this.ip=this.gu.ip;
    this.port=this.gu.port;
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
