import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GameQuestion } from '../game/model/game-question';
import { GameQuestionComponent } from './game-question.component';

@Injectable({
  providedIn: 'root'
})
export class GameQuestionService {

  constructor(public dialog: MatDialog) { }

  public open(data: GameQuestion) {
    return this.dialog.open(GameQuestionComponent, {data});
  } 
}
