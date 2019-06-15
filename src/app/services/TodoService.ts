import { Injectable } from '@angular/core';
import {Todo} from '../model/Todo';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Todo [];
  updateTodo: Todo;
  constructor() {
    this.todoList = [];
  }
/*
  Returns a list of todos
*/
  getTodoList(): Todo[] {
    return this.todoList;
  }

/*
Sets updated list of todos
*/
  setTodoList(newTodoList: Todo[]): void {
    this.todoList = newTodoList;
  }

/*
  Adds an item to the list of todos
*/
  addsToTodoList(data): void {
   this.todoList.push(data);
  }
/*
Record an item that is to be updated
*/
  setItemToUpdate(data): void {
    this.updateTodo = data;
  }
/*
  Returns an item that is to be updated
*/
  getItemToUpdate(): Todo {
    return this.updateTodo;
  }
}
