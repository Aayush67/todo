import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../model/Todo';
import {TodoService} from '../services/TodoService';
import {MatDialog} from '@angular/material';
import {EventDialogComponent} from '../dialog/eventDialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;
  todoList: Todo []; //Contains a List of added TODOs
  constructor(private router: Router, private fb: FormBuilder, private todoService: TodoService, private dialog: MatDialog) { }

  /*
    Intializes Todo form
  */
  ngOnInit() {
    this.addTodoForm = this.fb.group({
      title: ['' , Validators.required ],
      description: [ '' , Validators.required ],
      time: ['' , [Validators.required]]
    });
    this.todoList = this.todoService.getTodoList();
  }

  /*
    Adds TODO
   */
  addTodo(){
    console.log(this.addTodoForm);
    if (this.addTodoForm.valid) {
      const eventDateInMillis = Date.parse(this.addTodoForm.controls.time.value + '');
      const todayDateInMillis = Date.parse(new Date() + '');
      //Stops execution when event time is less than or equal to current time
      if (eventDateInMillis <= todayDateInMillis) {
        this.dialog.open(EventDialogComponent, {
          data: {
            message: 'Event Time should be greater than current time'
          }
        });
        return ;
      }
      const todoData = {
        id: this.todoList.length > 0 ? this.todoList[this.todoList.length - 1].id + 1 : 1,
        title: this.addTodoForm.controls.title.value,
        description: this.addTodoForm.controls.description.value,
        time: eventDateInMillis,
        checked: false
      }
      this.todoService.addsToTodoList(todoData);
      this.dialog.open(EventDialogComponent, {
        data: {
          message: 'Added Successfully'
          }
        });
      this.router.navigate(['/list']);
      this.addTodoForm.reset();
      this.ngOnInit();
    } else {
      //Triggers all required field error if any field is left empty
      this.addTodoForm.controls.title.markAsTouched();
      this.addTodoForm.controls.description.markAsTouched();
      this.addTodoForm.controls.time.markAsTouched();
    }
  }

}
