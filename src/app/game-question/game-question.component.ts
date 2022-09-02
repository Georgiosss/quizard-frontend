import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GameQuestion } from '../game/model/game-question';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameQuestion) { }

  ngOnInit(): void {
  }

}
