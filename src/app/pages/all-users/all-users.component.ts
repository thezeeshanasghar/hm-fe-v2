import { TransectionModel } from './../../Models/Transection.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  date: Date;
  transection:TransectionModel[];

  constructor() {
    this.date=new Date();
   }

  ngOnInit() {
  }

}
