import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  checkingLogingStatus(){
    var token= localStorage.getItem('access_token');
    if(token){
      const payload = this.payloadDecode(token);
      /* Check if payload is valid here we are checking the expiration */
      if(payload.exp != undefined){
        return true;
      }
    }
    return false;
  }
  /* Decoding JWT token */
  payloadDecode(token:any){
    return JSON.parse(atob(token.split('.')[1]));
  }
  isLoggedIn(){
    return this.checkingLogingStatus();
  }
}
