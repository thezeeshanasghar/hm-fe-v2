import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit, TemplateRef} from '@angular/core';
import { GeneralHttpService } from '../../services/general-http.service';
import { AccountModel } from '../../Models/account.model';
import { BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  allAccounts: AccountModel[]=[];
  singleUser: AccountModel;
  grandTotal: number=0.0;
  totalExpense: number=0.0;
  totalIncome: number=0.0;
  
  transaction: TransactionModel[] = [];

  constructor(private gu: GeneralHttpService,private modalService: BsModalService) { }
  modalRef: BsModalRef;
  modalRefIncome:BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalIncome(templateIncome: TemplateRef<any>) {
    this.modalRefIncome = this.modalService.show(templateIncome);
  }
  ngOnInit() {
    console.log(this.allAccounts);
   
 this.getAllAccounts();
    
  }

  getAllAccounts() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
    }, error => { });
  }

  getLogById(id) {
    this.gu.getTransactionsIdBy(id).subscribe(data => {
      this.transaction = data.ResponseData;

      this.transaction.forEach(element => {
        if(element.Amount>0)
        {
          this.totalIncome+=element.Amount;
        }
        else{
          this.totalExpense+=element.Amount;
        }

        this.grandTotal= this.totalIncome+this.totalExpense;
        this.gu.getAccountById(id).subscribe(data => {
          element.Account = data.ResponseData;
          this.singleUser=element.Account
        }, error => { console.log(error); });
      });
    }, error => { console.log(error); });
  }
  print(): void
  {
   let printContents, popupWin;
   printContents = document.getElementById('print-section').innerHTML;
   console.log(printContents);
   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
   popupWin.document.open();
   popupWin.document.write(`
     <html>
       <head>
         <title>Hussain Motors</title>
         <style>
        
         th{
           width:150px;
           background-color:Blue;
         }
         td{
           width:300px;
           text-align:center;
           background-color:skyBlue;
         }
         </style>
       </head>
   <body onload="window.print();window.close()">
   <table>

   </table>
   ${printContents}
   </body>
     </html>`
   );
   popupWin.document.close();
 }

}
