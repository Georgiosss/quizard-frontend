import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
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
  intAnswer!: number; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameQuestion) { }

  ngOnInit(): void {
  }
  

  click(answer: string) {
    this.answer = answer;
    var button = document.getElementById('mult');
    if (button !== null) {
      button.click();
    }
  }
  write() {
    var button = document.getElementById('single');
    console.log(button);
    if (button !== null) {
      button.click();
    }
  }

}