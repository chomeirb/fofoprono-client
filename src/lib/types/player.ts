export type RankedUser = {
	rank: number;
	name: string;
	score: number;
	results_good: number;
	results_perfect: number;
	user_type: UserType;
};

export type Group = {
	label: string;
	queryUsers: string;
};

export enum UserType {
	Current = 'Current',
	Other = 'Other'
}
