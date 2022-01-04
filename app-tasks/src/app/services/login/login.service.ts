import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, {username, password});
  }
  logout(){
    return this.http.post(`${environment.apiUrl}/auth/logout`,"");
  }
  setToken(data:any){
    localStorage.setItem('access_token', data.access_token);
  }
  getToken(){
    return localStorage.getItem('access_token');
  }
  removeToken(){
    localStorage.removeItem('access_token');
  }
  payloadDecode(token:any){
    return console.log(JSON.parse(atob(token.split('.')[1])));
  }

}
