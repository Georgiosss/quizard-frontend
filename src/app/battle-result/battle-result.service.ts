import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Game } from '../game/model/game';

import { BattleResultComponent } from './battle-result.component';

@Injectable({
  providedIn: 'root'
})
export class BattleResultService {

  myDialog!: MatDialogRef<BattleResultComponent>;

  constructor(public dialog: MatDialog) { 
    
  }

  public open(data: Game) {
    this.myDialog = this.dialog.open(BattleResultComponent, {data});
    this.myDialog.disableClose = true;
    return this.myDialog;
  } 
}
