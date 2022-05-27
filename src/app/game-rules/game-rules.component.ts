import { Component, OnInit } from '@angular/core';
import { GameRulesService } from './game-rules.service';
import { Rule } from './rule';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit {
  rules!: Rule[];


  constructor(private gameRulesService: GameRulesService) { }

  ngOnInit(): void {
    this.gameRulesService.getRules().subscribe((rules: Rule[]) => this.rules = rules);
  }

}
