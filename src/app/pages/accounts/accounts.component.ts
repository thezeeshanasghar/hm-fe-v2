import { Component, OnInit } from '@angular/core';
import { GeneralHttpService } from '../../services/general-http.service';
import { AccountModel } from '../../Models/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  allAccounts: AccountModel[]=[];

  constructor(private gu: GeneralHttpService) { }

  ngOnInit() {
    console.log(this.allAccounts);
    this.getAllAccounts();
    
  }

  getAllAccounts() {
    this.gu.getAllAccounts().subscribe(data => {
      this.allAccounts = data.ResponseData;
    }, error => { });
  }

}
