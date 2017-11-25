import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { AccountModel } from '../Models/account.model';

@Injectable()
export class GeneralHttpService {

  private ip: string;
  private port: number;
  constructor(private http: Http) {
    //this.ip='hm-api.afz-sol.com';
    //this.port = 80;

    this.ip = 'localhost';
    this.port = 16443;
  }

  public getTransactions() {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let str = "http://" + this.ip + ":" + this.port + "/api/transaction";
    return this.http.get(str).map((response: Response) => response.json());
  }

  public getTransactionsIdBy(id) {
    let str = "http://" + this.ip + ":" + this.port + "/api/account/" + id + "/transactions";
    return this.http.get(str).map((response: Response) => response.json());

  }
  public PostTransaction(m) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(m);
    console.log(body);
    let url = "http://" + this.ip + ":" + this.port + "/api/transaction";
    console.log(url);
    return this.http.post(url, body, { headers: headers }).map((response: Response) => response.json());

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

  public postAccount(obj: AccountModel) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = "http://" + this.ip + ":" + this.port + "/api/account";
    return this.http.post(url, JSON.stringify(obj), { headers: headers }).map((response: Response) => response.json());
  }

}
