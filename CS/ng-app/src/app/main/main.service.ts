import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MainService {
  constructor(private http: HttpClient) { }

  test:string=" this is a service variable";
  baseUrl:string = "https://randomuser.me/api/?results=40";

  getUsers(){
    return this.http.get(this.baseUrl);
  }

}