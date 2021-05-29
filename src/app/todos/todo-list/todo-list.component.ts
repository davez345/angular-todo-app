import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TodoList } from 'src/app/core/models/TodoList.model';
import { TodoService } from 'src/app/core/services/todos.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Todo } from 'src/app/core/models/Todo.model';
import { Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  filterOptions: string[] = ["Active","Finished","All"];
  searchValue: string;
  selected: string = 'All';
  todoList: TodoList;
  todos: Todo[] = [];
  listId: number; 
  subscription: Subscription;

  

  constructor(private dialog: MatDialog, private route: ActivatedRoute,
  private todoService: TodoService) { }

  ngOnInit(): void {

      this.route.params.subscribe((params: Params) => {
        this.listId = +params['id'];
        if(this.todoService.getTodoList(this.listId)) {    
            this.todoList = this.todoService.getTodoList(this.listId);
            this.todos = this.todoList.todos;
        }
      });

      this.subscription = this.todoService.TodoUpdate
      .subscribe(
        (todoLists: TodoList[]) => { 
            if(todoLists[this.listId] && todoLists[this.listId].todos.length >= 1) {
              this.todoList = this.todoService.getTodoList(this.listId);
              this.todos = todoLists[this.listId].todos;
            } else {
              this.todos = [];
          }
      }
      );

      if(this.todoService.getTodoList(this.listId)) {
        this.todoList = this.todoService.getTodoList(this.listId);
        this.todos = this.todoList.todos; 
      }
     
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      listIndex: this.listId
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
        this.addTask(data);
      }}
    );
  }

  openEditDialog(taskIndex: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      listIndex: this.listId,
      todoTask: this.todos[taskIndex]
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.updateTask(data,taskIndex);
        }
      }
    );
  }

  onMarkTask(event:MatCheckboxChange, todo: Todo, taskIndex: number) {
    todo.done = event.checked;
    this.updateTask(todo, taskIndex)
  }

  onDelete(taskIndex: number) {
    console.log(this.listId)
    this.todoService.deleteTodoTask(this.listId,taskIndex);
  }

  addTask(newTodo: Todo) {
    this.todoService.addTodoTask(this.listId, newTodo);
  }

  updateTask(newTodo: Todo, taskIndex: number) {
    this.todoService.updateTodoTask(this.listId, taskIndex, newTodo);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}
