import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tasks } from 'src/app/modals/Tasks';
import { TasksService } from 'src/app/services/tasks/tasks.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  EditTaskForm: FormGroup;
  selectedTask: Tasks;
  task: Tasks[];
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private TaskServ: TasksService,) { }

  ngOnInit(): void {
    this.EditTaskForm= this.fb.group({
      description: [this.selectedTask.description, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(90)
      ]]
    })
  }

  updateTask(){
    let data = { ...this.EditTaskForm.value, id: this.selectedTask.id}
    this.TaskServ.update(data).subscribe( res =>{
      console.log('data edited successfully')
    })
    this.modal.close();
    this.EditTaskForm.reset();
    // window.location.reload();
  }
}
