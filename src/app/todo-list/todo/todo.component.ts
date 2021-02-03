import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { IToDo } from 'src/app/models/todo';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  public daysUntilDue: string = '';

  @Input()
  listItem: boolean = false;

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
    this.getDaysUntilDue();
  }

  getDaysUntilDue(): void {
    if (this.todo.dueDate != "") {
      let today = moment();
      let dueDate = moment(this.todo.dueDate);
      let daysUntilDue = dueDate.diff(today, 'days');

      this.daysUntilDue = `${ daysUntilDue } day${ daysUntilDue <= 1 ? '' : 's' }`;
    }
  }


  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  deleteClick(): void {
    this.deleteTodo.emit(this.todo);
  }

  saveClick(updatedTodo?: IToDo): void {
    updatedTodo && (this.todo = updatedTodo);
    this.updateTodo.emit(this.todo);
  }
}
