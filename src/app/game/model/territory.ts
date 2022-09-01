import { Castle } from "./castle";

export class Territory {
    userId!: number;
    territoryId!: string;
    color!: string;
    points!: number;
    castle!: Castle;
}