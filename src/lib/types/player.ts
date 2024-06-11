export type RankedUser = {
	rank: number;
	connected: boolean;
	name: string;
	points: number;
	results_good: number;
	results_perfect: number;
};

export type Group = {
	label: string;
	queryUsers: string;
};
