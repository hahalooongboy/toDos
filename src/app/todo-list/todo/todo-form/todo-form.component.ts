import { v4 as uuid } from 'uuid';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IToDo } from 'src/app/models/todo';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  public uniqueId: string;

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
    this.uniqueId = uuid();
  }

  ngOnInit(): void {

    this.initTodo();
  }

  get name() { return this.todoForm.get('name')! }
  get dueDate() { return this.todoForm.get('dueDate')! }

  initTodo(): void {
    if (this.isNewTodo) {
      this.todoForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(1)
        ]),
        description: new FormControl(''),
        dueDate: new FormControl(''),
        isComplete: new FormControl(false)
      });
    } else {
      this.todoForm = new FormGroup({
        name: new FormControl(this.todo.name, [
          Validators.required,
          Validators.minLength(1)
        ]),
        description: new FormControl(this.todo.description),
        dueDate: new FormControl(this.todo.dueDate),
        isComplete: new FormControl(this.todo.isComplete)
      });
    }
  }

  // New To-Do
  saveNewTodo(event: any): void {
    this.todo = { ...this.todoForm.value };
    this.newTodoSave.emit(this.todo);
    event.currentTarget.reset();
    this.todoForm.reset();
    this.initTodo();
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
