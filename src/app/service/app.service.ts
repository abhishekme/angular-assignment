import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { from, Subject, Subscription } from 'rxjs';
import {BehaviorSubject}  from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class AppService {
  currentlatitude: any;

  public apiServerUrl         =   'http://localhost:3000/user';

  public setValue: any;
  public setIBValue: any;
  public oldScopeData: any;
  userDataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  publicuserData: any[] =[];
  public urlData = new Subject<any>();
  urlSubscription: Subscription;

  constructor(public http: HttpClient, public _router: Router) { }

    inputFilter(e: any, regType?:any) {
      try {        
          let regEx = new RegExp(/^[a-z ]+$/);
          if (regEx.test(e.key)) {
              return true;
          } else {
              e.preventDefault();
              return false;
          }
      } catch (ex) {
      }
    }

    forCapsLetter(e: any, regType?:any) {
      try {        
          let regEx = new RegExp(/^[a-z ]+$/);
          if (regEx.test(e.key)) {
              return true;
          } else {
              e.preventDefault();
              return false;
          }
      } catch (ex) {
      }
    }
    
    //validation Check
    
    checkInput(inputParamas: string, modelInput: any){
      var resultValidInput = false;

      switch(inputParamas){
              case 'email':
              resultValidInput = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(modelInput);                
              break;
      }
      return (resultValidInput) ? true : false;
    }

    //Save New User
    post(postData: any){
      const url = `${this.apiServerUrl}`;
      return this.http.post(url, postData);
    }

    //Get All User
    get(){
      const url = `${this.apiServerUrl}`;
      return this.http.get(url);
    }

    //Filter User
    searchParam(data) {
      var queryParam = '?fname='+data;
      const url = `${this.apiServerUrl+queryParam}`;
      return this.http.get(url);
    }

    
    //User Update
    // update(postData: any, id: number){
    //   const url = `${this.BASE_URL}` + this._constants.API_ENDPOINT.trainerAPI + '/' + id;
    //   return this.http.put(url, postData, this._service.getAuthHeaders());
    // }

    //User Delete
    delete(id: number){
      const url = `${this.apiServerUrl+'/'+id}`;
      return this.http.delete(url);
    }
}



