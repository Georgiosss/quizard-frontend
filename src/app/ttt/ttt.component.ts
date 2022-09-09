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
import { Player } from '../game/model/player';

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
  startText: boolean = false;
  players: Player[] = [];

  sequence = ["RED",  "RED", "RED",  "RED", "RED",  "RED", "RED",  "RED", "RED",  "RED", "RED",  "RED", ];
  turn: number = 0;
  constructor(public inputDialogService: InputDialogService,
    private notificationDialogService: NotificationDialogService, 
    public boardService: GameService,private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    var elem = document.getElementById('tow1');
    if (elem !== null) {
      elem.style.top = "100px";
      elem.style.left = "100px";
      elem.style.position = "fixed";
    }
  }

  territories = [
    {id: "1", castle: 3},
    {id: "2", castle: 1},
    {id: "3", castle: 2},
    {id: "4", castle: 1},
    {id: "5", castle: 1},
    {id: "6", castle: 2},
    {id: "7", castle: 1},
    {id: "8", castle: 1},
    {id: "9", castle: 3},
    {id: "10", castle: 1},
    {id: "11", castle: 2},
    {id: "12", castle: 1},
  ]

  ngAfterViewInit() {
    for (let i = 0; i < this.territories.length; i++) {
      const ter = this.territories[i];
      const elem = document.getElementById('tow' + ter.id.toString());
      if (elem !== null) {
        const elem2 = document.getElementById(ter.id.toString());
        if (elem2 !== null) {
          let x = (elem2.getBoundingClientRect().right + elem2.getBoundingClientRect().left) / 2;
        let y = (elem2.getBoundingClientRect().top + elem2.getBoundingClientRect().bottom) / 2;
        console.log(x);
        console.log(y);
        elem.style.top = '' + (y - 30) + 'px';
        elem.style.left = '' + (x - 30) + 'px';
        elem.classList.add('tower-' + ter.castle);
        }
      }
    }
  }

  do(i: number) {
    var elem = document.getElementById('test' + i);
      if (elem !== null) {
        var $test = elem.innerHTML, $html = '', $i;
  
        for ($i = 0; $i < $test.length; $i++) {
          $html += '<span style="animation: foo ' + $i + 's">' + ($test[$i]) + '</span>';
        }
        elem.innerHTML = $html;
      }
  }

  doNothing() {
  
  }

  createGame() {
    this.turn++;
    const elem = document.getElementById(this.turn.toString());
    if (elem) {
      elem.style.backgroundColor = "#000000";
    }
    /*
    let observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry: any) => {
                        if (entry.intersectionRatio) {
                            entry.target.opacity = '1'
                            observer.unobserve(entry.target)
                        }
                    })
                },
                { rootMargin: '0px 0px 100px 0px' },
            )
            document.querySelectorAll('span').forEach((span) => {
                observer.observe(span)
            })
    
    
    let url = `${this.endpoint}/game/create`;
    this.http.post<any>(url, "asd").subscribe((game: any) => {
      this.game = game;
      this._connect(game.gameId);
      this.notificationDialogService.open({title: "თქვენი თამაშის კოდი:", content: game});
    })
    */
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
