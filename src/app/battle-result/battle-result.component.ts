import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Game } from '../game/model/game';
import { BattleResultService } from './battle-result.service';

@Component({
  selector: 'app-battle-result',
  templateUrl: './battle-result.component.html',
  styleUrls: ['./battle-result.component.scss']
})
export class BattleResultComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Game, 
  public battleResultService: BattleResultService) {
    
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.battleResultService.myDialog.close();
    }, 10000);
  }

}
