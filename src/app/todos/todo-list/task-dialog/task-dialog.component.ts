import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from 'moment';
import { Todo } from 'src/app/models/Todo.model';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  todoData: Todo;
  listIndex: number;
  editMode: boolean;
  currentDate: Date = new Date();
  
  
  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
       this.listIndex = data.listIndex;
       this.todoData = null;
       if(data.todoTask) {
         this.todoData = data.todoTask;
         this.editMode = true;
       }
    }


  ngOnInit(){
    this.initForm()
  }

  save() {
    let formValue = this.taskForm.value;
    const newTodo = new Todo(formValue['title'],formValue['description'],formValue['deadline'],false);
    this.dialogRef.close(newTodo);
  }

  close() {
      this.dialogRef.close();
  }

  private initForm() {
  
    let todoTitle = '';
    let todoDescription = '';
    let todoDate = new Date();
  
    let data = this.todoData;

    if(data) {
      todoTitle = data.title;
      todoDescription = data.description;
      todoDate = new Date(moment(data.deadline).format('YYYY-MM-DDTHH:mm'));
    }

    this.taskForm = new FormGroup({
      'title': new FormControl(todoTitle),
      'description': new FormControl(todoDescription),
      'deadline': new FormControl(todoDate),
    }); 
  }

}
