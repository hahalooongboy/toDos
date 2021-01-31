import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { IToDo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  @Input()
  todo!: IToDo;

  @Input()
  isEditMode: boolean = false;

  @Output()
  deleteTodo = new EventEmitter<IToDo>();

  @Output()
  updateTodo = new EventEmitter<IToDo>();

  constructor () { }

  ngOnInit(): void {
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  deleteClick(): void {
    this.deleteTodo.emit(this.todo);
  }

  saveClick(): void {
    this.updateTodo.emit(this.todo);
  }
}
