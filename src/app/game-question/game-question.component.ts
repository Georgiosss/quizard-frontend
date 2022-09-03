import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GameQuestion } from '../game/model/game-question';
import { MultipleChoiceQuestion } from '../game/model/multiple-choice-question';
import { SingleChoiceQuestion } from '../game/model/single-choice-question';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  answer!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameQuestion) { }

  ngOnInit(): void {
  }
  

  click(answer: string) {
    alert(answer);
  }

}
