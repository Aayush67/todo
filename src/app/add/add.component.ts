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
      todoName: ['' , Validators.required ],
      description: [ '' , Validators.required ],
      time: ['' , [Validators.required]]
    });
    this.todoService.getTodoList().subscribe(response => {
      this.todoList = response;
    });
  }

  /*
    Adds TODO
   */
  addTodo() {
    console.log(this.addTodoForm);
    if (this.addTodoForm.valid) {
      const eventDateInMillis = Date.parse(this.addTodoForm.controls.time.value + '');
      const todayDateInMillis = Date.parse(new Date() + '');
      //Stops execution when event time is less than or equal to current time
      if (eventDateInMillis <= todayDateInMillis) {
        this.todoService.messageDialogBox('Event Time should be greater than current time');
        return ;
      }
      const todoData = {
        todoName: this.addTodoForm.controls.todoName.value,
        description: this.addTodoForm.controls.description.value,
        time: eventDateInMillis
      }
      this.todoService.addTodo(todoData).subscribe(res => {
        this.todoService.messageDialogBox('Added Successfully');
        this.router.navigate(['/list']);
        this.addTodoForm.reset();
      }, error1 => {
        this.todoService.messageDialogBox('Some Internal Error Occured');
      });
    } else {
      //Triggers all required field error if any field is left empty
      this.addTodoForm.controls.todoName.markAsTouched();
      this.addTodoForm.controls.description.markAsTouched();
      this.addTodoForm.controls.time.markAsTouched();
    }
  }
}
