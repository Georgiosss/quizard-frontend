import { GameAnswer } from "./game-answer"
import { Player } from "./player";
export class PlayerAnswer {
    gameAnswer!: GameAnswer;
    seconds!: number;
    score!: number;
    player!: Player;
}