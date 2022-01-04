import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private SpinnerService: SpinnerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.SpinnerService.requestStarted();
    return this.handler(next,request);
  }
  handler(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>>{
    return next.handle(request)
    .pipe(
      tap(
          (event:any) =>{
            if(event instanceof HttpResponse){
              this.SpinnerService.requestEnded();
            }
          },
          (Error: HttpErrorResponse) =>{
            this.SpinnerService.resetSpinner();
            throw Error;
          }
      )
    )
  }
}
