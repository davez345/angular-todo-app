import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TodoList } from "../models/TodoList.model";
import { TodoService } from "../services/todos.service";

@Injectable({providedIn: 'root'})
export class TodosResloverService implements Resolve<TodoList[]> {
    constructor(private todoService: TodoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const todos = this.todoService.getTodoLists();

        if (todos.length === 0) {
            return this.todoService.fetchTodos();
        } else {
            return todos;
        }
    }
}