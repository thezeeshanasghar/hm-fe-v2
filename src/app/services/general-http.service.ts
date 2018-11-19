import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { AccountModel } from '../Models/account.model';
import { SIGABRT } from 'constants';

@Injectable()
export class GeneralHttpService {

  public ip: string;
  public port: number;
  constructor(private http: Http) {
    // this.ip = 'hm-api.afz-sol.com';
    // this.port = 80;

    this.ip = 'localhost';
    this.port = 81;
  }
  public getTransactionsByDateRange(startDate = '', endDate = '') {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let str = "http://" + this.ip + ":" + this.port + "/api/transaction";
    str += "?startDate="+startDate+"&endDate="+endDate;
    return this.http.get(str, { headers: headers }).map((response: Response) => response.json());
  }


  public getTransactions(date = '') {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let str = "http://" + this.ip + ":" + this.port + "/api/transaction";
    str += "?date=" + date;
    return this.http.get(str, { headers: headers }).map((response: Response) => response.json());
  }

  public getAccounts(date = '') {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let str = "http://" + this.ip + ":" + this.port + "/api/account";
    str += "?date=" + date;
    return this.http.get(str, { headers: headers }).map((response: Response) => response.json());
  }


  public deleteTransaction(id) {
    let str = "http://" + this.ip + ":" + this.port + "/api/transaction/" + id;
    return this.http.delete(str).map((response: Response) => response.json());

  }

  public getTransactionsIdBy(id) {
    let str = "http://" + this.ip + ":" + this.port + "/api/account/" + id + "/transactions";
    return this.http.get(str).map((response: Response) => response.json());

  }
  public EditTransaction(id, m) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(m);
    console.log(body);
    let url = "http://" + this.ip + ":" + this.port + "/api/transaction/" + id;
    console.log(url);
    return this.http.put(url, body, { headers: headers }).map((response: Response) => response.json());

  }
  public PostTransaction(m) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let body = JSON.stringify(m);
    debugger
    // console.log(body);
    var x = new Date();
    x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
    let url = "http://" + this.ip + ":" + this.port + "/api/transaction";
    console.log(url);
    return this.http.post(url, m, { headers: headers }).map((response: Response) => response.json());

  }

  public getAllAccounts() {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let str = "http://" + this.ip + ":" + this.port + "/api/account";
    return this.http.get(str).map((response: Response) => response.json());
  }

  public getAccountById(id) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let str = "http://" + this.ip + ":" + this.port + "/api/account/" + id;
    return this.http.get(str).map((response: Response) => response.json());
  }

  public postAccount(obj: FormData) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = "http://" + this.ip + ":" + this.port + "/api/account";
    return this.http.post(url, obj).map((response: Response) => response.json());
  }


  public putAccount(obj: FormData, Id) {
    let url = "http://" + this.ip + ":" + this.port + "/api/account/" + Id;
    return this.http.put(url, obj).map((response: Response) => response.json());

  }

}
