import type { Game, SystemTime } from '$lib/types/game';
import type { Prono } from '$lib/types/prono';
import { Stage } from '$lib/types/game';
import { PronoResult } from '$lib/types/prono';

export function isPast(time: SystemTime): boolean {
	return new Date(time.secs_since_epoch * 1000) < new Date();
}

// Return minutes of a match if its in progress or false otherwise
export function getMatchTime(time: SystemTime): string | false {
	if (new Date(time.secs_since_epoch * 1000) > new Date() || new Date(time.secs_since_epoch * 1000 + 6660000) < new Date()) {
		return false;
	}
	// Return minutes of a match if its in progress
	let minutes = Math.floor((new Date().getTime() - new Date(time.secs_since_epoch * 1000).getTime()) / 60000);
	if (minutes > 65) {
		return (minutes - 20).toString() + "'";
	} else if (minutes > 48) {
		return 'Mi-temps';
	} else if (minutes > 45) {
		return '45+' + (minutes - 45).toString() + "'";
	} else {
		return minutes.toString() + "'";
	}
}

// Return a string of the date in the format of exemple : lun. 5 nov
export function formatDate(time: SystemTime): string {
	const date = new Date(time.secs_since_epoch * 1000);
	return date.toLocaleString('fr-FR', {
		weekday: 'short',
		day: 'numeric',
		month: 'short'
	});
}

// Return a string of the date in the format of exemple : 22:00
export function formatTime(time: SystemTime): string {
	const date = new Date(time.secs_since_epoch * 1000);
	return date.toLocaleString('fr-FR', {
		hour: 'numeric',
		minute: 'numeric'
	});
}

export function sysTimeToDate(time: SystemTime): Date {
	return new Date(time.secs_since_epoch * 1000);
}

export function stageToString(stage: Stage): string {
	switch (stage) {
		case Stage.Group:
			return 'Poule';
		case Stage.Sixteen:
			return 'Huitième';
		case Stage.Quarter:
			return 'Quart';
		case Stage.Semi:
			return 'Demi';
		case Stage.ThirdPlace:
			return 'Petite finale';
		case Stage.Final:
			return 'Finale';
	}
}

type Points = {
	correct: number;
	exact: number;
};

// Returned array always of length 3
export function potentialPoints(odd: number, stage: Stage): Points {
	let points;
	switch (stage) {
		case Stage.Group:
			points = odd * 8;
			break;
		case Stage.Sixteen:
			points = odd * 12;
			break;
		case Stage.Quarter:
			points = odd * 16;
			break;
		case Stage.Semi:
			points = odd * 20;
			break;
		case Stage.ThirdPlace:
			points = odd * 20;
			break;
		case Stage.Final:
			points = odd * 30;
			break;
	}

	return {
		correct: Math.round(points),
		exact: Math.round(points * 2)
	};
}

export function userPoints(points: Points, result: PronoResult): number | null {
	switch (result) {
		case PronoResult.Exact:
			return points.exact;
		case PronoResult.Correct:
			return points.correct;
		case PronoResult.Wrong:
			return 0;
        default:
            return null;
	}
}
