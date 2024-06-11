export enum PronoResult {
	Exact = 'Exact',
	Correct = 'Correct',
	Wrong = 'Wrong'
}

export type Prono = {
	prediction: Prediction;
	result: PronoResult;
};

export type Prediction = {
	game_id: number;
	home: number;
	away: number;
};

export enum Team {
	Home,
	Away
}
