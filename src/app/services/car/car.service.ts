import { Http, Response, RequestOptions, Headers} from '@angular/http';
import { GeneralHttpService } from './../general-http.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class CarService {

  constructor(private gs: GeneralHttpService, private http: Http) { }


  addCar(obj) {

    let httpOption = new Headers({ 'Content-Type': 'application/json' });
    const option = new RequestOptions( {headers: httpOption });
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car";
    return this.http.post(url, obj,option).map((response: Response) => response.json());

  }

  getCars() {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car";
    return this.http.get(url).map((response: Response) => response.json());

  }

}
