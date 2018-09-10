import { GeneralHttpService } from '../general-http.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class CarPurchaseService {

  constructor(public http: Http, public gs: GeneralHttpService) { }


  getOwnedCarsList(id) {
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car/account/" + id;
    return this.http.get(url).map(res => res.json());

  }
  getSharedCarsList(id1, id2) {
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car/account/" + id1 + '/' + id2;
    return this.http.get(url).map(res => res.json());

  }


  addPurchasedCar(form) {
    let httpOption = new Headers({ 'Content-Type': 'application/json' });
    const option = new RequestOptions({ headers: httpOption });
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/carpurchase";
    // let obj=JSON.stringify(form)
    return this.http.post(url, form, option).map((response: Response) => response.json());

  }

  getPurchaseCarList() {
    let url = "http://" + this.gs.ip + "/api/carpurchase";
    return this.http.get(url).map(res => res.json());

  }

}
