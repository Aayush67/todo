import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../model/Todo';
import {TodoService} from '../services/TodoService';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {EventDialogComponent} from '../dialog/eventDialog.component';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListTodoComponent implements OnInit {
  todoList: Todo [];
  displayedColumns: string[] = ['select', 'id', 'title', 'description', 'time' , 'actions'];
  // dataSource = new BehaviorSubject([]);
  dataSource = new MatTableDataSource<Todo>();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private todoService: TodoService, private router: Router , private dialog: MatDialog) { }

/*
  Gets list of todos on page load
*/
  ngOnInit() {
    this.todoList = this.todoService.getTodoList();
    this.dataSource = new MatTableDataSource(this.todoList);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);

    // this.dataSource.next(this.todoList);
  }

/*
  Record data to update list of todos
*/
  setUpdateTodo(dataToUpdate) {
    this.todoService.setItemToUpdate(dataToUpdate);
    this.router.navigate(['/update']);
  }

/*
  Delete an item from a list of todos
*/
  deleteSingleTodoItem(item) {
    const indexOfDeleteTodo = this.todoList.indexOf(item);
    this.todoList.splice(indexOfDeleteTodo, 1);
    this.dataSource = new MatTableDataSource(this.todoList);

    //Detect changes on deletion of todo and update mat-table
    // this.dataSource.next(this.todoList);
    if (this.todoList.length === 0) {
      this.router.navigate(['/add']);
    }
  }

/*
  Mark/Unmark the todos to be deleted
*/
  toggleCheckBox(element) {
      element.checked = !element.checked;
  }
/*
  Deletes all checked item from list of todos
*/
  deleteMultipleTodoItem() {
    let atLeastOneIsChecked = false;
    this.todoList = this.todoList.filter(todo => {
      if (todo.checked) {
        atLeastOneIsChecked = true;
      }
      return !todo.checked;
    })
    this.dataSource = new MatTableDataSource(this.todoList);
    this.todoService.setTodoList(this.todoList);
    // this.dataSource.next(this.todoList);
    if (!atLeastOneIsChecked) {
      this.dialog.open(EventDialogComponent, {
        data: {
          message: 'At least one Item needs to be selected'
        }
      });
    }
    if (this.todoList.length === 0) {
      this.router.navigate(['/add']);
    }
  }
}
