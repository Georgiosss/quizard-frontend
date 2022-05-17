import { Injectable } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationDialogData } from './notification-dialog-data';
import { NotificationDialogComponent } from './notification-dialog.component';

@Injectable({
  providedIn: 'root',
})

export class NotificationDialogService {

  constructor(public dialog: MatDialog) {}

  public open(data: NotificationDialogData) {
        this.dialog.open(NotificationDialogComponent, {data});
  }

}
