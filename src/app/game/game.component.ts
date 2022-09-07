import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, Subscription } from "rxjs";
import { GameQuestionService } from '../game-question/game-question.service';
import { GameService } from './game.service';
import { Game } from './model/game';
import { Territory } from './model/territory';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  game: Game = new Game();
  stompClient!: any;
  topic: string = "/topic/game/";

  colors: any = {
    "RED": "#ff0000",
    "BLUE": "#00ff00",
    "GREEN": "#0000ff"
  };

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  constructor(private actRoute: ActivatedRoute,
    private gameService: GameService,
    private gameQuestionService: GameQuestionService
    ) { 
      
    }

  //@ViewChild('vashli', {static: false}) vashli: ElementRef;

  ngOnInit(): void {
    this.joinGame(this.actRoute.snapshot.paramMap.get('gameId'));
  
    const element = document.getElementById('map');
    if (element != undefined) {
      element.style.transform = "scale(" + (window.innerWidth / 2000) + ")";
    }
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      const element = document.getElementById('map');
      if (element != undefined) {
        element.style.transform = "scale(" + (window.innerWidth / 2000) + ")";
      }
    })

  }

  ngAfterViewInit(): void {
    this.updateGame();
  }

  //topic/game/123

  ngOnDestroy() {
   
  }

  joinGame(gameId: string | null) {
    this.gameService.joinGame(gameId).subscribe((game: Game) => {
      this.onMessageReceived(game);
      console.log(this.game);
      const _this = this;
      _this.stompClient = this.gameService.connect(gameId);
      _this.stompClient.connect({}, function (frame: any) {
          _this.stompClient.subscribe(_this.topic + gameId, function (sdkEvent: any) {
            _this.onMessageReceived(JSON.parse(sdkEvent.body));    
          });
      });
    });;
  }

  onMessageReceived(game: Game) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA");
    console.log(game);
    this.game = game;
    this.updateGame();
  }

  clickTerritory(event: MouseEvent) {
    let id = (event.target as Element).id;
    this.gameService.clickTerritory(this.game.gameId, id).subscribe((game: Game) => {
      this.gameQuestionService.open(this.game.question);
    });
  }

  updateGame() {
    if (this.game.askQuestion) {
      this.gameQuestionService.open(this.game.question).afterClosed().subscribe((data: any) => {
        console.log("hahahahaha");
        console.log(data);
      });
    }
  }

  getTerritoryColor(id: string) {
    if (this.game.gameStarted) {
      if (Array.isArray(this.game.territories)) {
        for (let i = 0; i < this.game.territories.length; i++) {
          if (this.game.territories[i].territoryId.toString() === id) {
            return this.colors[this.game.territories[i].color];
          }
        }
      }
    }
    return "#8a00f4";
  }

  openQuestion() {
    
  }

  
}
