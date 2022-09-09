import { R3TargetBinder } from '@angular/compiler';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ResolveStart } from '@angular/router';
import { fromEvent, Observable, Subscription } from "rxjs";
import { GameQuestionService } from '../game-question/game-question.service';
import { GameService } from './game.service';
import { Game } from './model/game';
import { Territory } from './model/territory';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { BattleResultService } from '../battle-result/battle-result.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  game: Game = new Game();
  stompClient!: any;
  topic: string = "/topic/game/";
  currentUser: User;
  countdown: boolean = false;
  countdownNumber: number = 10; 
  currentCountDownNumber!: number;
  interval!: any;
  sequenceColored: boolean = false;
  

  colors: any = {
    "RED": "#ff0000",
    "GREEN": "#00ff00",
    "BLUE": "#0000ff",
    "TRANSPARENT": "#8a00f4",
    "YELLOW": "#ffe600",
    "BLACK": "#000000"
  };

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  constructor(private actRoute: ActivatedRoute,
    private gameService: GameService,
    private gameQuestionService: GameQuestionService,
    private battleResultService: BattleResultService,
    public authService: AuthService,
    private router: Router,
    ) { 
      this.currentUser = authService.getCurrentUser();
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

      if (this.game.territories) {
        for (let i = 0; i < this.game.territories.length; i++) {
          const territory = this.game.territories[i];
          const elem = document.getElementById(territory.territoryId.toString());
          if (elem != null) {
            const tower = document.getElementById("tow" + territory.territoryId.toString());
            if (tower !== null) {
              let x = (elem.getBoundingClientRect().right + elem.getBoundingClientRect().left) / 2;
              let y = (elem.getBoundingClientRect().top + elem.getBoundingClientRect().bottom) / 2;
              console.log(x);
              console.log(y);
              tower.style.top = '' + (y - 25) + 'px';
              tower.style.left = '' + (x - 25) + 'px';
              tower.classList.add('tower-' + territory.castle.leftTowers);
            }
          }
        }
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
    console.log(this.game);
    this.updateGame();
  }

  clickTerritory(event: MouseEvent) {
    let id = (event.target as Element).id;
    this.clickTerritoryWithId(id);
  }

  clickTerritoryWithId(id: string) {
    if (this.game.gameStarted) {
      if (this.game.availableTerritories) {
        for (let i = 0; i < this.game.availableTerritories.length; i++) {
          console.log(id);
          console.log(this.game.availableTerritories[i].toString());
          if (this.game.availableTerritories[i].toString() === id) {
            this.gameService.clickTerritory(this.game.gameId, id).subscribe((game: Game) => {

            });
          }
        }
      }
    }
  }

  resetTerritoryStyles() {
    if (this.game.territories) {
      for (let i = 0; i < this.game.territories.length; i++) {
        const territory = this.game.territories[i];
        const elem = document.getElementById(territory.territoryId.toString());
        if (elem != null) {
          elem.style.transition = "2.5s";
          elem.style.fill = this.colors[territory.color];

          const tower = document.getElementById("tow" + territory.territoryId.toString());
          if (tower !== null) {
            let x = (elem.getBoundingClientRect().right + elem.getBoundingClientRect().left) / 2;
            let y = (elem.getBoundingClientRect().top + elem.getBoundingClientRect().bottom) / 2;
            console.log(x);
            console.log(y);
            tower.style.top = '' + (y - 25) + 'px';
            tower.style.left = '' + (x - 25) + 'px';
            tower.classList.add('tower-' + territory.castle.leftTowers);
          }
        }
      }
    }
  }

  colorAvailableTerritories() {
    if (this.game.availableTerritories) {
      for (let i = 0; i < this.game.availableTerritories.length; i++) {
        const id = this.game.availableTerritories[i];
        const elem = document.getElementById(id.toString());
        if (elem != null) {
          elem.style.fill = this.colors["YELLOW"];
        }
      }
    }
  }

  getCurrentPlayer() {
      if (this.game.players) {
        for (let i = 0; i < this.game.players.length; i++) {
          const player = this.game.players[i];
          if (player.email === this.currentUser.email) {
            return player;
          } 
        }
      }
      return null;
  }

  updatePlayerTurn() {
    const player = this.getCurrentPlayer();
    const elem = document.getElementById("board");
    console.log("updatePlayerTurn");
    if (elem && player) {
      if (this.game.territoryToChoose && !player.territoryToChoose) {
        document.body.classList.add('disabled');
      } else {
        document.body.classList.remove('disabled');
      }
    }
  }

  startCountDown() {
    if (this.game.territoryToChoose) {
      this.updatePlayerTurn();
      this.countdown = true;
      this.countdownNumber = 10;
      this.interval = setInterval(() => {
        this.countdownNumber--;
        if (this.countdownNumber === 0) {
          this.countdownNumber = 10;
          this.countdown = false;
          if (this.getCurrentPlayer()?.territoryToChoose) {
            this.clickTerritoryWithId(this.game.availableTerritories[0].toString());
          }
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  getBackgroundColorOfSequence(id: number) {
    if (id < this.game.turn) {
      return this.colors["BLACK"];
    }
    return this.colors[this.game.sequence[id]];
  }

  askQuestion() {
    const now = new Date().getTime();  
    document.body.classList.remove('disabled');
      this.gameQuestionService.open(this.game.question).afterClosed().subscribe((data: any) => {
        this.gameService.answer({
          gameId: this.game.gameId,
          gameAnswer: {
            answerType: data.type,
            answer: data.answer
          },
          startTime: now
        }).subscribe((data: any) => {
          this.game = data;
          console.log(this.game);
        }); 
      });
  }

  showBattleResult() {
    if (this.game.battleResult) {
      document.body.classList.remove('disabled');
      this.battleResultService.open(this.game).afterClosed().subscribe(() => {
       
      });
    }
  }

  updateGame() {
    this.countdown = false;
    this.countdownNumber = 10;
    clearInterval(this.interval);
    this.resetTerritoryStyles();
    this.colorAvailableTerritories();
    if (this.game.battleResult) {
      setTimeout(() => {
        this.startCountDown();
      }, 11000);
    } else {
      this.startCountDown();
    }
    this.showBattleResult();

    if (this.game.askQuestion) {
      if (this.game.battleResult) {
        setTimeout(() => {
          this.askQuestion();
        }, 15000);
      } else {
        this.askQuestion();
      }
      
    } 
  }

  openQuestion() {
    
  }

  
}
