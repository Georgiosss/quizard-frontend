import { Player } from "./player";
import { Territory } from "./territory";

export class Game {
    gameId: string = "";

    players!: Player[];
    territories!: Territory[];
    gameStarted: Boolean = false;

    gameEnded: Boolean = false;
    finalResults!: Player[];

    askQuestion: Boolean = false;
}