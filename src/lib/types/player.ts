export type UserScore = {
    name: string,
    score: number,
    results_good: number,
    results_perfect: number,
    user_type: UserType,
}

export class Current {
    name!: string;
    score!: number;
    results_good!: number;
    results_perfect!: number;
}

export class Other {
    name!: string;
    score!: number;
    results_good!: number;
    results_perfect!: number;
}

export enum UserType {
    Current,
    Other,
}