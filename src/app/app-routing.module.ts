import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodosResloverService } from './todos/todos-resolver.service';
import { TodosComponent } from './todos/todos.component';


const routes: Routes = [
  { path: '', redirectTo: '/todos/0', pathMatch: 'full' },
  { path: 'todos', component: TodosComponent, children: [
    { path: ':id', component: TodoListComponent, resolve: [TodosResloverService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
