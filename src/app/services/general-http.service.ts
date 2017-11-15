import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class GeneralHttpService {

  constructor(private http:Http) { }

  public getTransections()
  {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let str="http://hm-api.afz-sol.com/api/transaction";
     return this.http.get(str).map((response: Response) => response.json());
  }

  public getAllUsers()
  {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let str="http://hm-api.afz-sol.com/api/account";
     return this.http.get(str).map((response: Response) => response.json());
  }

  public getAllUsersById(id)
  {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let str="http://hm-api.afz-sol.com/api/account/"+id+"/transactions";
    console.log(str);
     return this.http.get(str).map((response: Response) => response.json());
  }

}
