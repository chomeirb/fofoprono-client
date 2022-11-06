export enum Result {
  Exact = 'Exact',
  Correct = 'Correct',
  Wrong = 'Wrong',
}

export type PronoResult = {
  prediction: Prono,
  result: Result,
}

export type Prono = {
  game_id: number;
  prediction_home: number;
  prediction_away: number;
};

export enum Team {
  Home,
  Away,
}