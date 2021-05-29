import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Todo } from '../core/models/Todo.model';
import { TodoList } from '../core/models/TodoList.model';
import { TodoService } from '../core/services/todos.service';
import { TodosDialogComponent } from '../todos-dialog/todos-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {


  todoLists: TodoList[] = [];
  addTodoForm: FormGroup;
  subscription: Subscription;

  constructor(private todosService: TodoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.initForm()
    this.todosService.fetchTodos().subscribe()

    this.subscription = this.todosService.TodoUpdate
      .subscribe(
        (todoLists: TodoList[]) => {
          this.todoLists = todoLists;
        }
      );
    
  }

  onSubmit() {
    const newTodoList = new TodoList(this.addTodoForm.value['title'], <Todo[]>[]);
    this.todosService.addTodoList(newTodoList);
  }

  private initForm() {
    let todoTitle = '';
    this.addTodoForm = new FormGroup({
      'title': new FormControl(todoTitle) 
    }); 
  }

  onDelete(index: number) {
    this.todosService.deleteTodoList(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(listTitle: string, listIndex: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      listTitle: listTitle,
      todoList: this.todosService.getTodoList(listIndex)
    };

    const dialogRef = this.dialog.open(TodosDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
        this.todosService.editTodoList(listIndex,data)
      }
     }
    );
  }

}
