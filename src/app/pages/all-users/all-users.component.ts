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
  transection:TransactionModel[];
  allUsers:any;

  constructor(private gu:GeneralHttpService) {
    this.date=new Date();
    // this.getUsers();
   }
   getUsers()
   {
     this.gu.getAllUsers().subscribe(data=>{
       console.log(data.ResponseData)
       this.allUsers=data.ResponseData;

     },error=>{});
   }

  ngOnInit() {
  }

}
