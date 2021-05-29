import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoList } from 'src/app/core/models/TodoList.model';
import { TaskDialogComponent } from 'src/app/todos/todo-list/task-dialog/task-dialog.component';

@Component({
  selector: 'app-todos-dialog',
  templateUrl: './todos-dialog.component.html',
  styleUrls: ['./todos-dialog.component.scss']
})
export class TodosDialogComponent implements OnInit {

  listForm: FormGroup;
  listTitle: string;
  todoList: TodoList;


  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.listTitle = data.listTitle;
      this.todoList = data.todoList;
    }

  ngOnInit(): void {
    this.initForm()
  }

  save() {
    this.todoList.title = this.listForm.value['title'];
    this.dialogRef.close(this.todoList);
  }

  close() {
      this.dialogRef.close();
  }

  private initForm() {

    let title = this.listTitle;

    this.listForm = new FormGroup({
      'title': new FormControl(title)
    }); 
  }


}
