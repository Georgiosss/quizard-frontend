import { Injectable } from '@angular/core';
import {
HttpClient,
HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { Game } from './model/game';
import { WebSocketService } from '../shared/web-socket.service';
import { throws } from 'assert';
import { Territory } from './model/territory';
import { values } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  endpoint: string = config.apiUrl;
  stompClient!: any;


  constructor(private http: HttpClient, public router: Router,
    private webSocketService: WebSocketService) { 
      
    }

  joinGame(gameId: string | null) {
    let url = `${this.endpoint}/game/connect`;
    return this.http.post<Game>(url, {gameId: gameId});
  }

  connect(gameId: string | any) {
   return this.webSocketService._connect(gameId);

  }

  clickTerritory(gameId: string, territoryId: string) {
    let url = `${this.endpoint}/game/gameplay/chooseTerritory`;
    return this.http.post<Game>(url, {territoryId: territoryId, gameId: gameId});
  }


  
}
