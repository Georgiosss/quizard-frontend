import { GameQuestion } from "./game-question";
import { Player } from "./player";
import { Territory } from "./territory";
import { BattleResult } from "./battle-result";

export class Game {
    gameId: string = "";

    players!: Player[];
    territories!: Territory[];
    gameStarted: Boolean = false;
    territoryToChoose: Boolean = false;
    availableTerritories!: number[];
    sequence!: string[];
    turn!: number;

    gameEnded: Boolean = false;
    finalResults!: Player[];

    askQuestion: Boolean = false;
    question!: GameQuestion;
    battleResult!: BattleResult;
}