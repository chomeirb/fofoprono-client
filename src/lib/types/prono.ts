export enum PredictionResult
{
  Exact = 'Exact',
  Correct = 'Correct',
  Wrong = 'Wrong',
}

export type PronoResult = {
  prediction: Prediction,
  result: PredictionResult,
}

export type Prediction = {
  game_id: number;
  prediction_home: number;
  prediction_away: number;
};

export enum Team
{
  Home,
  Away,
}