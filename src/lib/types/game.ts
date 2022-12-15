export enum Stage {
	Group = 'Group',
	Sixteen = 'Sixteen',
	Quarter = 'Quarter',
	Semi = 'Semi',
    ThirdPlace = 'ThirdPlace',
	Final = 'Final'
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
	secs_since_epoch: number;
	nanos_since_epoch: number;
};
