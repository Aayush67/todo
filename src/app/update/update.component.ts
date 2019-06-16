import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../model/Todo';
import {TodoService} from '../services/TodoService';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateTodoComponent implements OnInit {

  updateTodoForm: FormGroup;
  todoToUpdate: Todo;
  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router, private dialog: MatDialog) { }
/*
  Intializes formfield with the data to be updated
*/
  ngOnInit() {
    this.todoToUpdate = this.todoService.getItemToUpdate();
    console.log(this.todoToUpdate.time)
    this.updateTodoForm = this.fb.group({
      todoName: [this.todoToUpdate.todoName , Validators.required ],
      description: [ this.todoToUpdate.description , Validators.required ],
      time: [new Date(this.todoToUpdate.time) , [Validators.required]]
    });
    console.log('update', this.todoToUpdate);
  }
/*
  update an item from todo list
*/
  updateTodoList() {
    if (this.updateTodoForm.valid) {
      const eventDateInMillis = Date.parse(this.updateTodoForm.controls.time.value + '');
      const todayDateInMillis = Date.parse(new Date() + '');

      if (eventDateInMillis <= todayDateInMillis) {
        this.todoService.messageDialogBox('Event Time should be greater than current time');
        return ; //Stops further execution in invalid case
       }
      const updateTodoData = {
        id: this.todoToUpdate.id,
        todoName: this.updateTodoForm.controls.todoName.value,
        description: this.updateTodoForm.controls.description.value,
        time: eventDateInMillis
      }
      this.todoService.updateTodo(updateTodoData).subscribe(res => {
        this.todoService.messageDialogBox('Updated Successfully');;
        this.router.navigate(['/list']);
      }, error1 => {
        this.todoService.messageDialogBox('Some Internal Error Occured');
      });
    } else {
         this.updateTodoForm.controls.todoName.markAsTouched();
         this.updateTodoForm.controls.description.markAsTouched();
         this.updateTodoForm.controls.time.markAsTouched();
    }
  }

}
