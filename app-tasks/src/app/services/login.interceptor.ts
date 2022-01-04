import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private token: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.token.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token.getToken()}`
        }
      })
    }
    return next.handle(request);
  }
}
