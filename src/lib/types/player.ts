export type UserScore = {
    score: number,
    results_good: number,
    results_perfect: number,
    user_type: UserType,
}

export type RankedUser = {
    name: string,
    user_score: UserScore,
    user_type: UserType,
    rank: number,
    show: boolean,
}

export type Group = {
    label: string,
    queryUsers: string,
}

export enum UserType {
    Current = 'Current',
    Other = 'Other',
}