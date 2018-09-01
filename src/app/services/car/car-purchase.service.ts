import { GeneralHttpService } from '../general-http.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CarPurchaseService {

  constructor(public http: Http, public gs: GeneralHttpService) { }


  getOwnedCars(id = '', id2 = '') {

    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car";
    this.http.get(url).map(res => res.json());

  }

}
