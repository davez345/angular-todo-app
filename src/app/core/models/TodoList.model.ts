import { Todo } from "./Todo.model";

export class TodoList {
    public title: string;
    public todos: Todo[];
  
    constructor(title: string, todos: Todo[]) {
      this.title = title;
      this.todos = todos;
    }
  }