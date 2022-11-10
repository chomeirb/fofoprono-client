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
}

export enum UserType {
    Current,
    Other,
}