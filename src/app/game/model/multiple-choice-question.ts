import { Choice } from "./choice";
import { Question } from "./question";

export class MultipleChoiceQuestion extends Question {
    choices!: Choice[];
    answer!: string;
}