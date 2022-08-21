import { Component, OnInit, Injectable } from '@angular/core';
import { GameService } from '../shared/game.service';
import { InputDialogService } from '../shared/input-dialog/input-dialog.service';
import { NotificationDialogService } from '../shared/notification-dialog/notification-dialog.service';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { Game } from './game';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-ttt',
  templateUrl: './ttt.component.html',
  styleUrls: ['./ttt.component.scss']
})
export class TttComponent implements OnInit {

  game!: Game;
  topic: string = "/topic/game/";
  stompClient: any;
  endpoint: string = config.apiUrl;
  webSocketEndPoint: string = `${this.endpoint}/ws`;

  constructor(public inputDialogService: InputDialogService,
    private notificationDialogService: NotificationDialogService, 
    public boardService: GameService,private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
   
  }

  createGame() {
    let url = `${this.endpoint}/game/start`;
    this.http.post<Game>(url, "asd").subscribe((game: Game) => {
      this.game = game;
      this._connect(game.gameId);
      this.notificationDialogService.open({title: "თქვენი თამაშის კოდი:", content: game.gameId});
    })
  }

  joinGame() {
    this.inputDialogService.open({
      title: "თამაშში შესვლა",
      content: "შეიყვანეთ კოდი",
      inputLabel: "კოდი",
      okButton: "შესვლა",
      input: ""
    }).afterClosed().subscribe((result: string) => {
      let url = `${this.endpoint}/game/connect`;
      this.http.post<Game>(url, {gameId: result}).subscribe((game: Game) => {
        this.game = game;
        this._connect(game.gameId);
        this.notificationDialogService.open({title: "წავიდა თამაშიიი:", content: "წარმატებები"});
      });
    });;
  }

  click() {
    let url = `${this.endpoint}/game/gameplay`;
    this.http.post<Game>(url, {gameId: this.game.gameId}).subscribe((game: Game) => {
      
    })
  }

  handleMessage(message: string) {
    console.log(message);
  }

    _connect(game: string) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
            console.log(_this.topic + game);
            _this.stompClient.subscribe(_this.topic + game, function (sdkEvent: any) {
                console.log("first time");
                console.log(sdkEvent);
                _this.onMessageReceived(JSON.parse(sdkEvent.body));
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            //this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(game: Game) {
      this.game = game;
    }

}
