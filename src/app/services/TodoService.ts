import { Injectable } from '@angular/core';
import {Todo} from '../model/Todo';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {EventDialogComponent} from '../dialog/eventDialog.component';
import {MatDialog} from '@angular/material';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Todo [];
  todoToUpdate: Todo;
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.todoList = [];
  }
/*
  Returns a list of todos
*/
  getTodoList(): Observable<any> {
    return this.http.get(environment.apiUrl + '/getAllTodos');
  }
/*
  Add Todo
*/
  addTodo(data): Observable <any> {
    return this.http.post(environment.apiUrl + '/addTodo', data);
   // this.todoList.push(data);
  }
/*
Record an item that is to be updated
*/
  setItemToUpdate(data): void {
    this.todoToUpdate = data;
  }
/*
  Returns an item that is to be updated
*/
  getItemToUpdate(): Todo {
    return this.todoToUpdate;
  }
/*
Delete a Todo item
*/
  deleteTodo(id): Observable<any> {
    return this.http.delete(environment.apiUrl + '/deleteTodo/' + id);
  }

/*
  Update Todo Item
*/
  updateTodo(data): Observable<any> {
    return this.http.put(environment.apiUrl + '/updateTodo/', data);
  }

/*
  Delete Multiple Todos
*/
  deleteMultipleTodos(idList): Observable<any> {
  return this.http.delete(environment.apiUrl + '/deleteMultipleTodos/' + idList);
  }
/*
Dialog Box to display messages
*/
  messageDialogBox(dialogMessage) {
    this.dialog.open(EventDialogComponent, {
      data: {
        message: dialogMessage
      }
    });
  }
}
