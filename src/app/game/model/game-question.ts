import { Player } from "./player";
import { Question } from "./question";

export class GameQuestion {
    question!: Question;
    players!: Player[];
    isFinished!: Boolean;
    answer!: string;
}