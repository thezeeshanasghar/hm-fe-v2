
import { GeneralHttpService } from './../../services/general-http.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  allAccounts: any[]=[];
  date1: Date;
  


  constructor(private gu: GeneralHttpService) {
    this.date1 = new Date();
    this.getAllAccounts();
  }

  getAllAccounts()
  {
    this.gu.getAllAccounts().subscribe(data=>{
      this.allAccounts=data.ResponseData;
      console.log(this.allAccounts);
    },error=>{});
  }

  ngOnInit() {
  }

}
