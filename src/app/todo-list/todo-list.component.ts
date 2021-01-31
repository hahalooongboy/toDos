import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IToDo } from '../models/todo';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: Array<IToDo> = [];

  constructor (
    private api: ApiService
  ) {
    this.todos = this.getToDoList();
  }

  ngOnInit(): void {
  }

  getToDoList(): any {
    this.api.getTodos()
      .subscribe(
        (response: any) => {
          this.todos = response;
          console.log(this.todos);
        },
        (error: any) => {
          console.error(`Error:: ${ error }`);
        }
      );
  }

  test(key: any): void {
    console.log(key);
  }

  deleteTodo(todo: IToDo): void {
    this.api.deleteTodo(todo.id).subscribe(
      (response: any) => {
        console.log(`${ todo.id } deleted.`);
        this.getToDoList();
      },
      (error: any) => {
        console.error(`Error:: ${ error }`);
      }
    );
  }

  updateTodo(todo: IToDo): void {
    this.api.updateTodo(todo).subscribe(
      (response: any) => {
        console.log(`${ todo.id } updated.`);
        this.getToDoList();
      },
      (error: any) => {
        console.error(`Error:: ${ error }`);
      }
    )
  }

  saveTodo(todo: IToDo): void {
    this.api.saveTodo(todo).subscribe(
      (response: any) => {
        console.log(`${ todo.id } saved.`);
        this.getToDoList();
      },
      (error: any) => {
        console.error(`Error:: ${ error }`);
      }
    )
  }
}
