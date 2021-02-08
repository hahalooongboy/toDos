import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IToDo } from '../models/todo'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private _toDosUrl = "https://localhost:5001/api/ToDoItems";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor (
    private http: HttpClient
  ) { }

  getTodos(): Observable<IToDo[]> {
    return this.http.get<IToDo[]>(`${ this._toDosUrl }`);
  }

  deleteTodo(id: string): Observable<{}> {
    const delUrl = `${ this._toDosUrl }/${ id }`;

    return this.http.delete(delUrl, this.httpOptions);
  }

  updateTodo(todo: any) {
    return this.http.put(`${ this._toDosUrl }/${ todo.id }`, todo);
  }

  saveTodo(todo: any) {
    return this.http.post(this._toDosUrl, todo, this.httpOptions);
  }
}
