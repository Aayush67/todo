import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTodoComponent} from './list/list.component';
import {AddTodoComponent} from './add/add.component';
import {UpdateTodoComponent} from './update/update.component';

const routes: Routes = [
  {path: 'add', component: AddTodoComponent},
  {path: 'list', component: ListTodoComponent},
  {path: 'update', component: UpdateTodoComponent},
  {path: '**', redirectTo: '/add' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
