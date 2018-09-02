import { GeneralHttpService } from '../general-http.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class CarPurchaseService {

  constructor(public http: Http, public gs: GeneralHttpService) { }


  getOwnedCarsList(id) {
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car/account/" + id;
    return this.http.get(url).map(res => res.json());

  }
  getSharedCarsList(id1,id2) {
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car/account/" + id1+'/'+id2;
    return this.http.get(url).map(res => res.json());

  }

}
