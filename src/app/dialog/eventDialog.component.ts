import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './eventDialog.component.html',
  styleUrls: ['./eventDialog.component.scss'],
})
/*
Custom dialog to display messages
*/
export class EventDialogComponent {
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.message = data.message;
  }

}


