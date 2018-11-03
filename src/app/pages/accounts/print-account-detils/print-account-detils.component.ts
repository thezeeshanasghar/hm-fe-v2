import { GeneralHttpService } from './../../../services/general-http.service';
import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';
import * as moment from 'moment'

@Component({
  selector: 'app-print-account-detils',
  templateUrl: './print-account-detils.component.html',
  styleUrls: ['./print-account-detils.component.css']
})
export class PrintAccountDetilsComponent implements OnInit {
  todayDate: Date;
  singleUser: any = '';
  selectedAccountTransactions: any = [];
  ip: any;
  port: any;
  constructor(public gu: GeneralHttpService) {
    this.todayDate = new Date();
    this.singleUser = JSON.parse(localStorage.getItem("singleUser"));
    this.selectedAccountTransactions = JSON.parse(localStorage.getItem("selectedAccountTransactions"));

  }

  ngOnInit() {
    this.ip = this.gu.ip;
    this.port = this.gu.port;
    this.singleUser = JSON.parse(localStorage.getItem("singleUser"));
    debugger  
    this.selectedAccountTransactions = JSON.parse(localStorage.getItem("selectedAccountTransactions"));

  }

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  public model: any = {
    beginDate: { year: 2018, month: 10, day: 9 },
    endDate: { year: 2018, month: 10, day: 19 }
  };
  getData(model) {
    var bd, ed;
    if (model != null) {
      console.log(model)
      bd = model.beginDate.year + "-" + model.beginDate.month + "-" + model.beginDate.day+"T00:00:00";
      ed = model.endDate.year + "-" + model.endDate.month + "-" + model.endDate.day+"T00:00:00";

      console.log(bd, ed)
      var filterArray: any = []
      debugger
      this.selectedAccountTransactions.forEach(e => {
        debugger

        if (e.Date >= bd && e.Date <= ed) {
          filterArray.push(e);
        }



      });

      this.selectedAccountTransactions = [];
      this.selectedAccountTransactions = filterArray;


    }
  }
  getRowTotalUsingIndex(index: number): number {
    let sum = 0;
    for (var i = 0; i <= index; i++) {
      sum += this.selectedAccountTransactions[i].Amount;
    }
    return sum;
  }

}
