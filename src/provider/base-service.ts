import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BaseService {

  public baseUrl = "http://localhost:3000/api/v1/restaurants";

  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }


}
