import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  constructor(
    private url:string,
    private http: HttpClient
  ) { }

    getAll(){
      return this.http.get(this.url+'/tasks');
    }
    create(resource:any){
        return this.http.post(this.url+'/tasks', resource)
        .pipe(catchError(this.handleError));
    }
    update(resource:any) {
      return this.http.put(this.url+'/edit', resource)
                 .pipe(
                   catchError(this.handleError)
                  );
    }
    delete(resource:any){
      return this.http.delete(this.url+"/delete/"+resource)
      .pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse){
      if (error.status === 0) {
        console.error('An error occurred:', error.error);
      } else {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
}
