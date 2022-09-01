import { GameAnswer } from "./game-answer";
import { PlayerAnswer } from "./player-answer";

export class BattleResult {
    gameAnswer!: GameAnswer;
    playerAnswers!: PlayerAnswer[];
}