export enum Stage {
  Group = 'Group',
  Sixteen = 'Sixteen',
  Quarter = 'Quarter',
  Semi = 'Semi',
  Final = 'Final',
}

export function displayStage(stage: Stage): string {
  switch (stage) {
    case Stage.Group:
      return 'Poule';
    case Stage.Sixteen:
      return '1/8';
    case Stage.Quarter:
      return '1/4';
    case Stage.Semi:
      return '1/2';
    case Stage.Final:
      return 'Finale';
  }
}

export type Game = {
  id: number;
  time: SystemTime;
  stage: Stage;
  team_home: string;
  team_away: string;
  score_home: number;
  score_away: number;
  odds_home: number;
  odds_away: number;
  odds_draw: number;
};

export type SystemTime = {
  secs_since_epoch: number,
  nanos_since_epoch: number,
}