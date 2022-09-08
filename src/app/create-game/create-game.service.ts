import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CreateGameComponent } from './create-game.component';
import {
  HttpClient,
  HttpHeaders,
  } from '@angular/common/http';
  import { config } from '../config';
  import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

  endpoint: string = config.apiUrl;

  constructor(public dialog: MatDialog, private http: HttpClient, public router: Router) { }

  public open(questionsCode: any) {
    const data = {value : questionsCode};
    return this.dialog.open(CreateGameComponent, {data});
  } 

  createGame(data: any) {
    let url = `${this.endpoint}/game/create`;
    return this.http.post<any>(url, data);
  }
}
