import type { Game } from "./game";

export type Prono = Game & {
  id: number;
  prediction_home: number;
  prediction_away: number;
};
