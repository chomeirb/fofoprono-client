export type Game = {
  id: number;
  time: number;
  stage: string;
  team_home: string;
  team_away: string;
  score_home: number;
  score_away: number;
  odds_home: number;
  odds_away: number;
  odds_draw: number;
}