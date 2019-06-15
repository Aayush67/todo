import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../model/Todo';
import {TodoService} from '../services/TodoService';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {EventDialogComponent} from '../dialog/eventDialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  updateTodoForm: FormGroup;
  updateTodo: Todo;
  todoList: Todo[];
  datePipe = new DatePipe('en-us');
  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router, private dialog: MatDialog) { }
/*
  Intializes formfield with the data to be updated
*/
  ngOnInit() {
    this.updateTodo = this.todoService.getItemToUpdate();
    console.log(this.updateTodo.time)
    this.updateTodoForm = this.fb.group({
      title: [this.updateTodo.title , Validators.required ],
      description: [ this.updateTodo.description , Validators.required ],
      time: [new Date(this.updateTodo.time) , [Validators.required]]
    });
  }
/*
  update an item from todo list
*/
  updateTodoList() {
    if (this.updateTodoForm.valid) {

      this.todoList = this.todoService.getTodoList();
      const eventDateInMillis = Date.parse(this.updateTodoForm.controls.time.value + '');
      const todayDateInMillis = Date.parse(new Date() + '');

      if (eventDateInMillis <= todayDateInMillis) {
          this.dialog.open(EventDialogComponent, {
            data: {
              message: 'Event Time should be greater than current time'
            }
          });
          return ;
       }
      const indexToUpdate = this.todoList.indexOf(this.updateTodo);
      this.todoList[indexToUpdate].time = this.updateTodoForm.controls.time.value;
      this.todoList[indexToUpdate].title = this.updateTodoForm.controls.title.value;
      this.todoList[indexToUpdate].description = this.updateTodoForm.controls.description.value;
      this.todoService.setTodoList(this.todoList);
      this.dialog.open(EventDialogComponent, {
        data: {
          message: 'Updated Successfully'
        }
      });
      this.router.navigate(['list']);
    } else {
         this.updateTodoForm.controls.title.markAsTouched();
         this.updateTodoForm.controls.description.markAsTouched();
         this.updateTodoForm.controls.time.markAsTouched();
    }
  }

}
