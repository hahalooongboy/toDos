import { v4 as uuid } from 'uuid';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IToDo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  @Input()
  isNewTodo: boolean = false;

  @Input()
  todo!: IToDo;

  @Output()
  newTodoSave = new EventEmitter<IToDo>();

  constructor () { }

  ngOnInit(): void {
    this.initNewTodo();
  }

  initNewTodo(): void {
    if (this.isNewTodo) {
      const newTodo: IToDo = {
        id: uuid(),
        name: '',
        description: '',
        dueDate: '',
        isComplete: false
      }

      this.todo = newTodo;
    }
  }

  saveNewTodo(): void {
    this.newTodoSave.emit(this.todo);
    this.initNewTodo();
  }

}
