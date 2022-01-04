import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tasks } from '../modals/Tasks';
import { LoginService } from '../services/login/login.service';
import { TasksService } from '../services/tasks/tasks.service';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('closeModal') closeModal:any;
  @ViewChild('closeModal2') closeModal2:any;
  taskForm: FormGroup;
  EditTaskForm: FormGroup;
  ArrayTask: FormArray;
  task: Tasks[];
  elementId:number;
  constructor(
    private fb: FormBuilder,
    private TaskServ: TasksService,
    private LoginService:LoginService,
    private router:Router,
    private ModalService:NgbModal) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
     ArrayTask : this.fb.array([this.createItem()])
    })
    this.getTasks();
  }
  get tasksArray() {return this.taskForm.get('ArrayTask') as FormArray}

  getTasksArray() :AbstractControl[]
  { return (<FormArray>this.taskForm.get('ArrayTask'))?.controls}

  createItem(){
    return this.fb.group({
      description: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(90)
      ]]
    });
  }
  getId(id:number){
    this.elementId=id;
  }
  getData(task: Tasks){
     const ref =this.ModalService.open(EditTaskComponent, { centered: true });
     ref.componentInstance.selectedTask = task;
     ref.result.then((yes) => {
     console.log("Yes Click");
    },
      (cancel) => {
        console.log("Cancel Click");
      })
  }

  addItem(){
    this.tasksArray.push(this.createItem());
  }
  removeItem(i:number){
    this.tasksArray.removeAt(i);
  }

  createTask(){
    for(let i of this.tasksArray.value){
      this.TaskServ.create(i).subscribe((res) =>{
        console.log(res);
        console.log('data inserted successfully');
    })
    }
    this.getTasks();
    this.closeModal.nativeElement.click();
    this.taskForm.reset();
  }

  deleteTask(id:number){
    this.TaskServ.delete(id).subscribe((res:any) =>{
      console.log('data deleted successfully');
    });
    this.getTasks();
    this.closeModal2.nativeElement.click();
  }
  getTasks(){
    this.TaskServ.getAll()
    .subscribe((res: any) =>{this.task = res.filter((r:any) => res.deletedAt == null);})
  }
  Logout(){
    this.LoginService.logout().subscribe((res) =>{
      this.LoginService.removeToken();
       window.location.reload();
    });
  }
  // reloadCurrentRoute() {
  //   const currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //       this.router.navigate([currentUrl]);
  //   });
//}
}
