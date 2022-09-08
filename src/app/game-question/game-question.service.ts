import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GameQuestion } from '../game/model/game-question';
import { GameQuestionComponent } from './game-question.component';

@Injectable({
  providedIn: 'root'
})
export class GameQuestionService {

  myDialog!: MatDialogRef<GameQuestionComponent>;

  constructor(public dialog: MatDialog) { 
    
  }

  public open(data: GameQuestion) {
    this.myDialog = this.dialog.open(GameQuestionComponent, {data});
    this.myDialog.disableClose = true;
    return this.myDialog;
  } 

 
}
