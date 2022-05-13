import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationDialogData } from './notification-dialog-data';


@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: NotificationDialogData) { }

  ngOnInit(): void {
  }

}
