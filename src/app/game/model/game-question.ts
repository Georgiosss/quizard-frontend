import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { Player } from "./player";
import { Question } from "./question";
import { SingleChoiceQuestion } from "./single-choice-question";

export class GameQuestion {
    question!: any;
    players!: Player[];
    isFinished!: Boolean;
    answer!: string;
}