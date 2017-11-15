import { GeneralHttpService } from './../../services/general-http.service';
import { TransactionModel } from './../../Models/Transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  date: Date;
  transaction: TransactionModel[];


  constructor(private gu: GeneralHttpService) {
    this.date = new Date();
  }

  ngOnInit() {
  }

}
