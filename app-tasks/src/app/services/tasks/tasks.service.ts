import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/modals/Tasks';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService  extends DataService{

  private data:Tasks;
  constructor(http:HttpClient) {
    super(`${environment.apiUrl}`,http)
  }
}
