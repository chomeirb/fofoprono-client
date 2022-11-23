import type { SystemTime } from "$lib/types/game";
import { Stage } from "$lib/types/game";

export function isPassed(time: SystemTime): boolean {
    return new Date(time.secs_since_epoch * 1000 - 3600000) < new Date();
}

// Return minutes of a match if its in progress or false otherwise
export function getMatchTime(time: SystemTime): string | false {
    if (new Date(time.secs_since_epoch * 1000 - 3600000) > new Date() || new Date(time.secs_since_epoch * 1000 - 3600000 + 6660000) < new Date()) {
        return false;
    }
    // Return minutes of a match if its in progress
    let minutes = Math.floor((new Date().getTime() - new Date(time.secs_since_epoch * 1000 - 3600000).getTime()) / 60000);
    if (minutes > 65) {
        return (minutes - 20).toString() + "'";
    } else if (minutes > 48) {
        return "Mi-temps";
    } else if (minutes > 45) {
        return "45+" + (minutes - 45).toString() + "'";
    } else {
        return minutes.toString() + "'";
    }
}

// Return a string of the date in the format of exemple : lun. 5 nov
export function formatDate(time: SystemTime): string {
    const date = new Date(time.secs_since_epoch * 1000 - 3600000);
    return date.toLocaleString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
}

// Return a string of the date in the format of exemple : 22:00
export function formatTime(time: SystemTime): string {
    const date = new Date(time.secs_since_epoch * 1000 - 3600000);
    return date.toLocaleString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
    });
}

export function sysTimeToDate(time: SystemTime): Date {
    return new Date(time.secs_since_epoch * 1000 - 3600000);
}

export function displayStage(stage: Stage): string {
    switch (stage) {
        case Stage.Group:
            return 'Poule';
        case Stage.Sixteen:
            return 'Huitième';
        case Stage.Quarter:
            return 'Quart';
        case Stage.Semi:
            return 'Demi';
        case Stage.Final:
            return 'Finale';
    }
}