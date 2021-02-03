import { v4 as uuid } from 'uuid';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IToDo } from 'src/app/models/todo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  @Output()
  updateTodoClick = new EventEmitter<IToDo>();

  @Output()
  cancelEditClick = new EventEmitter();

  todoForm!: FormGroup;

  constructor () {

  }

  ngOnInit(): void {
    this.initNewTodo();

    this.todoForm = new FormGroup({
      name: new FormControl(this.todo.name, [
        Validators.required,
        Validators.minLength(1)
      ]),
      description: new FormControl(this.todo.description),
      dueDate: new FormControl(this.todo.dueDate.toString()),
      isComplete: new FormControl(this.todo.isComplete)
    });
  }

  get name() { return this.todoForm.get('name')! }
  get dueDate() { return this.todoForm.get('dueDate')! }

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

  // New To-Do
  saveNewTodo(): void {
    this.todo = { id: uuid(), ...this.todoForm.value };
    this.newTodoSave.emit(this.todo);
  }

  // Edit To-Do
  updateTodo(): void {
    this.todo = { ...this.todo, ...this.todoForm.value };
    this.updateTodoClick.emit(this.todo);
  }

  toggleEditMode(): void {
    this.cancelEditClick.emit();
  }
}
