import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/Todo.model";
import { TodoList } from "../models/TodoList.model";
import { map, tap } from "rxjs/operators";

@Injectable()
export class TodoService {

    TodoUpdate = new Subject<TodoList[]>();
    todolists: TodoList[] = [];

    constructor(private http: HttpClient) {}


    getTodoLists() {
        return this.todolists.slice();
    }

    getTodoList(index: number){
        return this.todolists.slice()[index];
    }

    editTodoList(index: number, newTodoList: TodoList){
        this.todolists[index] = newTodoList
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    setTodoLists(lists: TodoList[]) {       
        this.todolists = lists;
        this.TodoUpdate.next(this.todolists.slice());
    }

    addTodoList(todoList: TodoList) {
        this.todolists.push(todoList);
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    updateTodoList(index: number, newTodoList: TodoList) {
        this.todolists[index] = newTodoList;
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    deleteTodoList(index: number) {
        this.todolists.splice(index, 1);
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    addTodoTask(listIndex: number, todo: Todo) {
        this.todolists[listIndex].todos.push(todo);
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    updateTodoTask(listIndex: number, taskIndex: number, newTodo: Todo) {
        this.todolists[listIndex].todos[taskIndex] = newTodo;
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    deleteTodoTask(listIndex: number, taskIndex: number) {
        this.todolists[listIndex].todos.splice(taskIndex, 1);
        this.TodoUpdate.next(this.todolists.slice());
        this.storeTodos();
    }

    storeTodos() {
        this.http.put('https://todoapp-d3c27-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        this.todolists
        ).subscribe(response => {
            console.log(response);
        })
    }

    fetchTodos() {
        return this.http.get<TodoList[]>('https://todoapp-d3c27-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
        ).pipe(map(todos=> { 
            if(todos)  {
            return todos.map(todoList => {
                return {...todoList, todos: todoList.todos ? todoList.todos : []}
            });
          } else {
              return null;
          }
        }),
        tap(todoLists => {
          if(todoLists) {
            this.setTodoLists(todoLists);
          }
        }))
    }
}