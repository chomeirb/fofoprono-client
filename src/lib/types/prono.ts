export type Prono = {
  game_id: number;
  prediction_home: number;
  prediction_away: number;
  result: string;
};

export enum Team {
  Home,
  Away,
}