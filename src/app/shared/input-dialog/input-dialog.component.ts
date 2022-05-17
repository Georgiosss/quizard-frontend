import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InputDialogData } from './input-dialog-data'; 

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InputDialogData) { }

  ngOnInit(): void {
  }

}
