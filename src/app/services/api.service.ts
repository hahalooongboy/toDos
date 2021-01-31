import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IToDo } from '../models/todo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _toDosUrl = "http://localhost:3000/todos";

  constructor (
    private http: HttpClient
  ) { }

  getTodos(): Observable<IToDo[]> {
    return this.http.get<IToDo[]>(`${ this._toDosUrl }`);
  }

  deleteTodo(id: string): Observable<{}> {
    const delUrl = `${ this._toDosUrl }/${ id }`;

    return this.http.delete(delUrl);
  }

  updateTodo(todo: IToDo) {
    return this.http.put(`${ this._toDosUrl }/${ todo.id }`, todo);
  }

  saveTodo(todo: IToDo) {
    return this.http.post(this._toDosUrl, todo);
  }
}
