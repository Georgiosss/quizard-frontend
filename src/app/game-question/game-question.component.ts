import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GameQuestion } from '../game/model/game-question';
import { MultipleChoiceQuestion } from '../game/model/multiple-choice-question';
import { SingleChoiceQuestion } from '../game/model/single-choice-question';
import { GameQuestionService } from './game-question.service';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  answer!: number;
  interval!: any;
  countdown: boolean = false;
  countdownNumber: number = 10;

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameQuestion, 
  public gameQuestionService: GameQuestionService) { }

  ngOnInit(): void {
      this.countdown = true;
      this.countdownNumber = this.data.question.time;
      this.interval = setInterval(() => {
        this.countdownNumber--;
        if (this.countdownNumber === 0) {
          this.countdownNumber = this.data.question.time;
          this.countdown = false;
          this.answer = 0;
          if (this.data.question.choices === undefined) {
            this.write();
          } else {
            this.click(0);
          }
          clearInterval(this.interval);
        }
      }, 1000);

  }
  

  click(answer: number) {
    if (!answer) {
      answer = 0;
    }
    this.gameQuestionService.myDialog.close({answer: answer, type: 1});
  }
  write() {
    if (!this.answer) {
      this.answer = 0;
    }
    this.gameQuestionService.myDialog.close({answer: this.answer, type: 0});
  }

}