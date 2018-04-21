import { Http ,Response} from '@angular/http';
import { GeneralHttpService } from './../general-http.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class CarService {

  constructor(private gs:GeneralHttpService,private http:Http) { }


  addCar(obj:FormData){
   
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let url = "http://" + this.gs.ip + ":" + this.gs.port + "/api/car";
      return this.http.post(url, obj).map((response: Response) => response.json());
    
  }

}
