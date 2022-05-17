import { Injectable } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InputDialogComponent } from './input-dialog.component';
import { InputDialogData } from './input-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public dialog: MatDialog) { }

  public open(data: InputDialogData) {
    return this.dialog.open(InputDialogComponent, {data});
}
}
